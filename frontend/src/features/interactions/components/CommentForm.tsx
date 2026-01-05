'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addInteraction } from '@/api/interactions'
import { getCurrentUser, saveArticle } from '@/api/users'
import { toast } from 'sonner'
import { Send } from 'lucide-react'

interface CommentFormProps {
  articleId: string
  onCommentAdded?: () => void
}

export function CommentForm({ articleId, onCommentAdded }: CommentFormProps) {
  const currentUser = getCurrentUser()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      toast.error('コメントを入力してください')
      return
    }

    setIsLoading(true)
    try {
      await addInteraction({
        articleId,
        userId: currentUser.id,
        type: 'comment',
        content: content.trim(),
      })
      
      // Auto-save article when commenting
      saveArticle(articleId)
      
      // Dispatch custom event to notify parent components
      window.dispatchEvent(new CustomEvent('articleInteraction'))
      
      setContent('')
      toast.success('コメントを追加しました')
      onCommentAdded?.()
    } catch (error) {
      toast.error('エラーが発生しました')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        placeholder="コメントを入力..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        className="resize-none"
      />
      <div className="flex items-center justify-end">
        <Button type="submit" size="sm" disabled={isLoading || !content.trim()}>
          <Send className="mr-2 h-4 w-4" />
          送信
        </Button>
      </div>
    </form>
  )
}

