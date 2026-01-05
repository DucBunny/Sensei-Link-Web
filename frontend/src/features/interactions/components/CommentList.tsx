'use client'

import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { MessageCircle } from 'lucide-react'
import { getCurrentUser } from '@/api/users'
import { getInteractionsByArticle } from '@/api/interactions'

interface CommentListProps {
  articleId: string
}

export function CommentList({ articleId }: CommentListProps) {
  const interactions = getInteractionsByArticle(articleId)
  const comments = interactions.filter((i) => i.type === 'comment')
  const currentUser = getCurrentUser()

  if (comments.length === 0) {
    return (
      <div className="bg-muted/50 text-muted-foreground rounded-lg border p-6 text-center text-sm">
        <MessageCircle className="mx-auto mb-2 h-8 w-8 opacity-50" />
        <p>まだコメントがありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
          addSuffix: true,
          locale: ja,
        })

        return (
          <div key={comment.id} className="bg-card rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                {comment.userId === currentUser?.id ? 'あなた' : '他の教師'}
              </span>
              <span className="text-muted-foreground text-xs">{timeAgo}</span>
            </div>
            <p className="text-foreground text-sm">{comment.content}</p>
          </div>
        )
      })}
    </div>
  )
}
