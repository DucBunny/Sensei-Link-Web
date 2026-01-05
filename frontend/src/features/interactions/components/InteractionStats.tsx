'use client'

import { MessageCircle, UserPen, Users } from 'lucide-react'
import { getCommentCount, getUsefulCount } from '@/api/interactions'
import { getArticleById, getCurrentUser, getUserById } from '@/api'

interface InteractionStatsProps {
  articleId: string
  className?: string
}

export function InteractionStats({
  articleId,
  className,
}: InteractionStatsProps) {
  const usefulCount = getUsefulCount(articleId)
  const commentCount = getCommentCount(articleId)
  const article = getArticleById(articleId)
  const author = getUserById(article?.authorId || '')
  const currentUser = getCurrentUser()

  return (
    <div
      className={`text-muted-foreground flex items-center gap-6 text-sm ${className || ''}`}>
      <div className="flex items-center gap-2">
        <UserPen className="h-4 w-4" />
        <span>
          {author?.id === currentUser?.id ? 'あなた' : `${author?.name}先生`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span>{usefulCount}人が関心</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        <span>{commentCount}コメント</span>
      </div>
    </div>
  )
}
