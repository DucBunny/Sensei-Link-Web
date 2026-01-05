import { toast } from 'sonner'
import { useState } from 'react'
import type { ConnectionSession } from '@/features/sessions/types/session'
import { joinSession, leaveSession } from '@/api/sessions'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MOCK_USERS } from '@/lib/mockData'
import { getCurrentUser } from '@/api/users'

interface JoinSessionDialogProps {
  session: ConnectionSession | null
  currentUserId: string
}

export const JoinSessionDialog = ({
  session,
  currentUserId,
}: JoinSessionDialogProps) => {
  const [localSession, setLocalSession] = useState<ConnectionSession | null>(
    session,
  )
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [email, setEmail] = useState('')
  const [customInfo, setCustomInfo] = useState('')
  const [error, setError] = useState('')

  // Lấy email từ user hiện tại
  const user = getCurrentUser()

  if (!localSession) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>セッション詳細</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">
          セッションが見つかりません
        </p>
      </>
    )
  }

  const isHost = localSession.hostId === currentUserId
  const isJoined = localSession.participantIds.includes(currentUserId)
  const canJoin = localSession.status === 'open' && !isJoined && !isHost
  const hostUser = MOCK_USERS.find((u) => u.id === localSession.hostId)

  const handleJoin = () => {
    if (!canJoin) return
    setEmail(user.email || '')
    setCustomInfo('')
    setError('')
    setShowInfoDialog(true)
  }

  const handleInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !customInfo) {
      setError('メールアドレスと追加情報を入力してください。')
      return
    }
    setShowInfoDialog(false)
    setError('')
    const success = joinSession(localSession.id, currentUserId, {
      email,
      note: customInfo,
    })
    if (success) {
      toast.success('セッションに参加しました')
      setLocalSession({
        ...localSession,
        participantIds: [...localSession.participantIds, currentUserId],
        participantInfoMap: {
          ...(localSession.participantInfoMap || {}),
          [currentUserId]: { email, note: customInfo },
        },
        status:
          localSession.participantIds.length + 1 >= localSession.minParticipants
            ? 'connecting'
            : 'open',
      })
    } else {
      toast.error('参加に失敗しました')
    }
  }

  const handleLeave = () => {
    const success = leaveSession(localSession.id, currentUserId)
    if (success) {
      toast.success('セッションから退出しました')
      setLocalSession({
        ...localSession,
        participantIds: localSession.participantIds.filter(
          (id) => id !== currentUserId,
        ),
        status:
          localSession.participantIds.length - 1 < localSession.minParticipants
            ? 'open'
            : 'connecting',
      })
    } else {
      toast.error('退出に失敗しました')
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>セッション詳細</DialogTitle>
      </DialogHeader>

      <div className="mt-2 space-y-3 text-sm">
        {!showInfoDialog && (
          <>
            <p>
              <b>タイトル:</b> {localSession.title}
            </p>
            <p>
              <b>説明:</b> {localSession.description}
            </p>
            <p>
              <b>目的:</b> {localSession.goal}
            </p>
            <p>
              <b>開催日時:</b>{' '}
              {localSession.time
                ? new Date(localSession.time).toLocaleString('ja-JP')
                : '未定'}
            </p>
            <p>
              <b>ホスト:</b> {hostUser ? hostUser.name : localSession.hostId}
            </p>
            <p>
              <b>参加人数:</b> {localSession.participantIds.length} /{' '}
              {localSession.minParticipants}
            </p>

            <div>
              <b>参加者一覧:</b>
              <ul className="mt-2 ml-4 list-disc">
                {localSession.participantIds.map((uid) => {
                  const user = MOCK_USERS.find((u) => u.id === uid)
                  const info = localSession.participantInfoMap?.[uid]
                  return (
                    <li key={uid} className="mb-1">
                      <div className="flex items-center gap-2">
                        {user?.avatar && (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-6 w-6 rounded-full"
                          />
                        )}
                        <span>{user?.name || uid}</span>
                        {info && (
                          <div className="text-muted-foreground ml-2 text-xs">
                            <div>{info.note}</div>
                            <div>{info.email}</div>
                          </div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}

        {!isHost && (
          <>
            <Button className="w-full" onClick={handleJoin} disabled={!canJoin}>
              {isJoined ? '参加済み' : '参加する'}
            </Button>

            {isJoined && (
              <Button
                className="mt-1 w-full"
                variant="outline"
                onClick={handleLeave}>
                セッションから退出する
              </Button>
            )}

            {showInfoDialog && (
              <div className="fixed inset-0 z-50 flex w-lg items-center justify-center">
                <div className="w-full rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-4 text-base font-bold text-black">
                    セッション参加には追加情報が必要です。
                  </div>
                  <div className="text-muted-foreground mb-4 text-sm">
                    メールアドレスと下記の情報を入力してください。他の参加者にも表示されます。
                  </div>
                  <form onSubmit={handleInfoSubmit} className="space-y-4">
                    <div>
                      <label className="text-b mb-2 block">
                        メールアドレス
                      </label>
                      <input
                        className="w-full rounded border px-2 py-1 text-sm"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-b mb-2 block">
                        自己紹介・一言・連絡先など（自由記入）
                      </label>
                      <input
                        className="w-full rounded border px-2 py-1 text-sm"
                        type="text"
                        value={customInfo}
                        onChange={(e) => setCustomInfo(e.target.value)}
                        required
                        placeholder="例: 連絡先（電話番号・SNSアカウントなど）"
                      />
                    </div>
                    {error && (
                      <div className="text-b text-red-500">{error}</div>
                    )}
                    <div className="mt-5 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowInfoDialog(false)}>
                        キャンセル
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700">
                        参加する
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {isHost && (
          <div className="text-muted-foreground mt-2 text-center text-xs">
            あなたはこのセッションのホストです
          </div>
        )}
      </div>
    </>
  )
}
