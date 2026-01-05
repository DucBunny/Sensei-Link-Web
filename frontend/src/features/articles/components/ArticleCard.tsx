'use client'

import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Bookmark, Clock, MessageCircle, UserPen, Users } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { toast } from 'sonner'
import type { Article } from '../types/article'
import { TopicTag } from '@/features/topics/components/TopicTag'
import {
  addInteraction,
  getCommentCount,
  getInteractionsByArticle,
  getUsefulCount,
  isArticleUsefulForUser,
  removeInteraction,
} from '@/api/interactions'
import {
  getCurrentUser,
  getUserById,
  saveArticle,
  unsaveArticle,
} from '@/api/users'
import { Button } from '@/components/ui/button'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const currentUser = getCurrentUser()
  const author = getUserById(article.authorId)
  const [usefulCount, setUsefulCount] = useState(getUsefulCount(article.id))
  const [isUseful, setIsUseful] = useState(
    currentUser ? isArticleUsefulForUser(article.id, currentUser.id) : false,
  )
  const commentCount = getCommentCount(article.id)

  // Calculate time ago
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
    locale: ja,
  })

  const handleUsefulToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      if (!currentUser) {
        return toast.error('「役立つ」を使うにはログインが必要です')
      }

      if (isUseful) {
        // Remove useful interaction
        const interactions = getInteractionsByArticle(article.id)
        const usefulInteraction = interactions.find(
          (i) => i.type === 'useful' && i.userId === currentUser.id,
        )

        if (usefulInteraction) {
          removeInteraction(usefulInteraction.id)
        }

        setIsUseful(false)
        setUsefulCount(Math.max(0, usefulCount - 1))

        // Check if user has any other interactions (comments) with this article
        const userInteractions = interactions.filter(
          (i) => i.userId === currentUser.id && i.id !== usefulInteraction?.id,
        )
        const hasComments = userInteractions.some((i) => i.type === 'comment')

        // Only unsave if no comments remain
        if (!hasComments) {
          unsaveArticle(article.id)
        }

        // Dispatch custom event to notify parent components
        window.dispatchEvent(new CustomEvent('articleInteraction'))

        toast.success('「役立つ」を取り消しました')
      } else {
        // Add useful interaction
        addInteraction({
          articleId: article.id,
          userId: currentUser.id,
          type: 'useful',
        })
        setIsUseful(true)
        setUsefulCount(usefulCount + 1)

        // Auto-save article when marked as useful
        saveArticle(article.id)

        // Dispatch custom event to notify parent components
        window.dispatchEvent(new CustomEvent('articleInteraction'))

        toast.success('「役立つ」とマークしました')
      }
    } catch (error) {
      toast.error('エラーが発生しました')
      console.error(error)
    }
  }

  return (
    <Link
      to="/articles/$articleId"
      params={{ articleId: article.id }}
      className="group block">
      <div className="bg-card rounded-lg border p-7 transition-all hover:shadow-md">
        {/* Header: Topic and Time */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {article.topic && (
              <TopicTag topic={article.topic} variant="outline" />
            )}
            <span className="text-muted-foreground text-xs">{timeAgo}</span>
          </div>
          <Button
            variant={isUseful ? 'default' : 'ghost'}
            size="sm"
            onClick={handleUsefulToggle}
            className="h-8 w-8 p-0">
            <Bookmark className={`h-5 w-5 ${isUseful ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Title */}
        <h3 className="group-hover:text-primary mb-2 text-lg leading-tight font-semibold transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {article.summary}
        </p>

        {/* Footer: Stats */}
        <div className="text-muted-foreground flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <UserPen className="h-4 w-4" />
            <span>
              {author?.id === currentUser?.id
                ? 'あなた'
                : `${author?.name}先生`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{article.readTime}分</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{usefulCount}人が関心</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
