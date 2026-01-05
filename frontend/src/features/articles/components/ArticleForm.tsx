'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TopicSelector } from '@/features/topics/components/TopicSelector'
import { createArticle } from '@/api/articles'
import { getCurrentUser } from '@/api/users'

interface ArticleFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function ArticleForm({ onSuccess, onCancel }: ArticleFormProps) {
  const currentUser = getCurrentUser()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')
  const [topicId, setTopicId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !topicId) {
      toast.error('すべての必須項目を入力してください')
      return
    }

    if (content.trim().length < 50) {
      toast.error('内容は50文字以上で入力してください')
      return
    }

    setIsLoading(true)
    try {
      if (!currentUser) {
        toast.error('記事を作成するにはログインが必要です')
        return
      }

      await createArticle({
        title: title.trim(),
        content: content.trim(),
        summary: summary.trim() || content.trim().substring(0, 100) + '...',
        topicId,
        authorId: currentUser.id,
      })
      toast.success('記事を作成しました')

      // Reset form
      setTitle('')
      setContent('')
      setSummary('')
      setTopicId('')

      onSuccess?.()
    } catch (error) {
      toast.error('エラーが発生しました')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topic" className="mb-2 block text-sm font-medium">
          トピック <span className="text-destructive">*</span>
        </label>
        <TopicSelector value={topicId} onValueChange={setTopicId} />
      </div>

      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          タイトル <span className="text-destructive">*</span>
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="記事のタイトルを入力..."
          required
        />
      </div>

      <div>
        <label htmlFor="summary" className="mb-2 block text-sm font-medium">
          要約（オプション）
        </label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="記事の要約を入力..."
          rows={2}
          maxLength={200}
        />
        <p className="text-muted-foreground mt-1 text-xs">
          {summary.length}/200文字
        </p>
      </div>

      <div>
        <label htmlFor="content" className="mb-2 block text-sm font-medium">
          内容 <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="記事の内容を入力（50文字以上）..."
          rows={6}
          required
        />
        <p className="text-muted-foreground mt-1 text-xs">
          {content.length}文字
        </p>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            キャンセル
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '作成中...' : '作成'}
        </Button>
      </div>
    </form>
  )
}
