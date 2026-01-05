import { toast } from 'sonner'
import { useState } from 'react'
import type { ConnectionSession } from '@/features/sessions/types/session'
import { joinSession, leaveSession } from '@/api/sessions'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MOCK_USERS } from '@/lib/mockData'

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
    const success = joinSession(localSession.id, currentUserId)
    if (success) {
      toast.success('セッションに参加しました')
      // Update local state to reflect join
      setLocalSession({
        ...localSession,
        participantIds: [...localSession.participantIds, currentUserId],
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
