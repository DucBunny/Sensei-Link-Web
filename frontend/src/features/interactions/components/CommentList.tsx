'use client'

import { getInteractionsByArticle } from '@/api/interactions'
import { getCurrentUser } from '@/api/users'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { MessageCircle } from 'lucide-react'

interface CommentListProps {
  articleId: string
}

export function CommentList({ articleId }: CommentListProps) {
  const interactions = getInteractionsByArticle(articleId)
  const comments = interactions.filter((i) => i.type === 'comment')
  const currentUser = getCurrentUser()

  if (comments.length === 0) {
    return (
      <div className="rounded-lg border bg-muted/50 p-6 text-center text-sm text-muted-foreground">
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
          <div key={comment.id} className="rounded-lg border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                {comment.userId === currentUser.id ? 'あなた' : '他の教師'}
              </span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
            <p className="text-sm text-foreground">{comment.content}</p>
          </div>
        )
      })}
    </div>
  )
}

