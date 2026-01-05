'use client'

import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  addInteraction,
  getInteractionsByArticle,
  getUsefulCount,
  isArticleUsefulForUser,
  removeInteraction,
} from '@/api/interactions'
import { getCurrentUser, saveArticle, unsaveArticle } from '@/api/users'

interface UsefulButtonProps {
  articleId: string
  onUpdate?: () => void
}

export function UsefulButton({ articleId, onUpdate }: UsefulButtonProps) {
  const currentUser = getCurrentUser()

  const [isUseful, setIsUseful] = useState(
    currentUser ? isArticleUsefulForUser(articleId, currentUser.id) : false,
  )
  const [usefulCount, setUsefulCount] = useState(getUsefulCount(articleId))
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      if (!currentUser) {
        return toast.error('「役立つ」を使うにはログインが必要です')
      }

      if (isUseful) {
        // Find and remove the useful interaction
        const interactions = getInteractionsByArticle(articleId)
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
          unsaveArticle(articleId)
        }

        // Dispatch custom event to notify parent components
        window.dispatchEvent(new CustomEvent('articleInteraction'))

        toast.success('「役立つ」を取り消しました')
      } else {
        await addInteraction({
          articleId,
          userId: currentUser.id,
          type: 'useful',
        })
        setIsUseful(true)
        setUsefulCount(usefulCount + 1)

        // Auto-save article when marked as useful
        saveArticle(articleId)

        // Dispatch custom event to notify parent components
        window.dispatchEvent(new CustomEvent('articleInteraction'))

        toast.success('「役立つ」とマークしました')
      }
      onUpdate?.()
    } catch (error) {
      toast.error('エラーが発生しました')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isUseful ? 'default' : 'outline'}
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className="gap-2">
      <Bookmark className={`h-4 w-4 ${isUseful ? 'fill-current' : ''}`} />
      <span>役立つ</span>
      {usefulCount > 0 && <span className="ml-1">({usefulCount})</span>}
    </Button>
  )
}
