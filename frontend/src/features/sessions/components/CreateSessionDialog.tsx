import { useState } from 'react'
import { toast } from 'sonner'
import type { Article } from '@/features/articles'
import type { CreateSessionInput } from '@/features/sessions/types/session'
import { createSession } from '@/api/sessions'
import { getCurrentUser } from '@/api/users'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const CreateSessionDialog = ({
  article,
  setOpenSession,
}: {
  article: Article
  setOpenSession: (open: boolean) => void
}) => {
  const [title, setTitle] = useState(article.title || '')
  const [description, setDescription] = useState('')
  const [goal, setGoal] = useState('')
  const [maxParticipants, setMaxParticipants] = useState<number>(5)
  const [time, setTime] = useState('')
  const currentUser = getCurrentUser()

  const handleCreate = () => {
    if (!currentUser) {
      toast.error('ログインが必要です')
      return
    }

    const input: CreateSessionInput = {
      articleId: article.id,
      topicId: article.topicId,
      title,
      description,
      goal,
      maxParticipants,
      hostId: currentUser.id,
      time,
    }

    try {
      createSession(input)
      toast.success('セッションを作成しました')
      // Reset form
      setTitle('')
      setDescription('')
      setGoal('')
      setMaxParticipants(5)
      setOpenSession(false)
      setTime('')
    } catch (e) {
      toast.error('セッション作成に失敗しました')
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>セッション作成</DialogTitle>
      </DialogHeader>

      <div className="mt-2 space-y-4">
        {/* Title */}
        <div>
          <Label className="mb-3 block">タイトル</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例：記事内容について自由に話す"
          />
        </div>

        {/* Description */}
        <div>
          <Label className="mb-3 block">内容</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="どんなセッションか簡単に説明"
          />
        </div>

        {/* Goal */}
        <div>
          <Label className="mb-3 block">目的</Label>
          <Input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="例：知見共有・質問・交流"
          />
        </div>

        {/* Max participants */}
        <div>
          <Label className="mb-3 block">最大参加人数</Label>
          <Input
            type="number"
            min={2}
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
          />
        </div>

        {/* Time */}
        <div>
          <Label className="mb-3 block">開催日時</Label>
          <Input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="例：2026-01-10T20:00"
          />
        </div>

        <Button className="w-full" onClick={handleCreate}>
          作成する
        </Button>
      </div>
    </>
  )
}
