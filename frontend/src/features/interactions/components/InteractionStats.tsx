'use client'

import { MessageCircle, Users } from 'lucide-react'
import { getUsefulCount, getCommentCount } from '@/api/interactions'

interface InteractionStatsProps {
  articleId: string
  className?: string
}

export function InteractionStats({ articleId, className }: InteractionStatsProps) {
  const usefulCount = getUsefulCount(articleId)
  const commentCount = getCommentCount(articleId)

  return (
    <div className={`flex items-center gap-6 text-sm text-muted-foreground ${className || ''}`}>
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

