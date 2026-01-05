import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'

import { getAllSessions, leaveSession } from '@/api/sessions'
import { getCurrentUser } from '@/api/users'
import { MOCK_USERS } from '@/lib/mockData'
import { Button } from '@/components/ui/button'

export function SessionsPage() {
  const currentUser = getCurrentUser()
  const allSessions = getAllSessions()
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  )
  const [sessions, setSessions] = useState(allSessions)
  const joinedSessions = sessions.filter(
    (s) =>
      s.participantIds.includes(currentUser.id) || s.hostId === currentUser.id,
  )
  const selectedSession =
    joinedSessions.find((s) => s.id === selectedSessionId) || null
  const hostUser = MOCK_USERS.find((u) => u.id === selectedSession?.hostId)

  const handleLeaveSession = () => {
    if (!selectedSession) return
    const success = leaveSession(selectedSession.id, currentUser.id)
    if (success) {
      // Cập nhật lại danh sách session
      const updatedSessions = sessions.map((s) =>
        s.id === selectedSession.id
          ? {
              ...s,
              participantIds: s.participantIds.filter(
                (id) => id !== currentUser.id,
              ),
            }
          : s,
      )
      setSessions(updatedSessions)
      setSelectedSessionId(null)
    } else {
      alert('セッションから退出できませんでした')
    }
  }

  return (
    <AppLayout breadcrumbs={[{ label: 'セッション' }]}>
      <div className="container mx-auto">
        <h1 className="mb-6 text-3xl font-bold">交流セッション</h1>
        <p className="text-muted-foreground mb-8">
          同じ興味を持つ教師とつながるためにセッションに参加しましょう
        </p>

        {selectedSession ? (
          <div className="mb-8 rounded-lg border p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">セッション詳細</h2>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <b>タイトル:</b> {selectedSession.title}
              </div>
              <div>
                <b>説明:</b> {selectedSession.description}
              </div>
              <div>
                <b>目的:</b> {selectedSession.goal}
              </div>
              <div>
                <b>ホスト:</b>{' '}
                {hostUser ? hostUser.name : selectedSession.hostId}
              </div>
              <div>
                <b>開催日時:</b>{' '}
                {selectedSession.time
                  ? new Date(selectedSession.time).toLocaleString('ja-JP')
                  : '未定'}
              </div>
              <div>
                <b>参加人数:</b> {selectedSession.participantIds.length} /{' '}
                {selectedSession.minParticipants}
              </div>
              <div>
                <b>状態:</b>{' '}
                {selectedSession.status === 'open'
                  ? '募集中'
                  : selectedSession.status === 'connecting'
                    ? '交流中'
                    : '終了'}
              </div>
              <div>
                <b>参加者一覧:</b>
                <ul className="mt-2 ml-4 list-disc">
                  {selectedSession.participantIds.map((uid) => {
                    const user = MOCK_USERS.find((u) => u.id === uid)
                    const info = selectedSession.participantInfoMap?.[uid]
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
            </div>
            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedSessionId(null)}>
                戻る
              </Button>
              {/* Nút rời session, chỉ hiện nếu không phải host và đã tham gia */}
              {selectedSession.hostId !== currentUser.id &&
                selectedSession.participantIds.includes(currentUser.id) && (
                  <Button variant="destructive" onClick={handleLeaveSession}>
                    セッションから退出する
                  </Button>
                )}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border p-8">
            {joinedSessions.length === 0 ? (
              <div className="text-muted-foreground text-center">
                参加中のセッションはありません
              </div>
            ) : (
              <ul className="space-y-4">
                {joinedSessions.map((session) => (
                  <li
                    key={session.id}
                    className="flex flex-col gap-2 border-b pb-4 last:border-b-0 last:pb-0 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-lg font-semibold">
                        {session.title}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {session.description}
                      </div>
                      <div className="mt-1 text-xs">
                        {session.participantIds.length} /{' '}
                        {session.minParticipants} 参加者
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setSelectedSessionId(session.id)}>
                      詳細を見る
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
