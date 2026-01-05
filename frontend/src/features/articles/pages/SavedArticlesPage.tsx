'use client'

import { useEffect, useMemo, useState } from 'react'
import { BookOpen, MessageCircle, Users } from 'lucide-react'
import { AppLayout } from '@/components/layout/AppLayout'
import { ArticleList } from '@/features/articles/components/ArticleList'
import { getAllArticles } from '@/api/articles'
import { getCurrentUser, getSavedArticles } from '@/api/users'
import { getUserInteractions } from '@/api/interactions'

export function SavedArticlesPage() {
  const currentUser = getCurrentUser()
  const [refreshKey, setRefreshKey] = useState(0)

  if (!currentUser) {
    return
  }

  // Re-fetch data when refreshKey changes
  const savedArticleIds = useMemo(() => getSavedArticles(), [refreshKey])
  const userInteractions = useMemo(
    () => getUserInteractions(currentUser.id),
    [currentUser.id, refreshKey],
  )

  // Listen for storage changes to update stats
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey((prev) => prev + 1)
    }

    // Listen for custom storage events
    window.addEventListener('storage', handleStorageChange)

    // Also listen for custom events dispatched from ArticleCard
    window.addEventListener('articleInteraction', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('articleInteraction', handleStorageChange)
    }
  }, [])
  const commentedArticleIds = useMemo(() => {
    return [
      ...new Set(
        userInteractions
          .filter((i) => i.type === 'comment')
          .map((i) => i.articleId),
      ),
    ]
  }, [userInteractions, refreshKey])

  const savedArticles = useMemo(() => {
    if (savedArticleIds.length === 0) return []
    const allArticles = getAllArticles()
    return allArticles.filter((article) => savedArticleIds.includes(article.id))
  }, [savedArticleIds, refreshKey])

  // Stats
  const savedCount = savedArticleIds.length
  const commentedCount = commentedArticleIds.length
  const participatedSessionsCount = 0 // Will be implemented in Phase 4

  return (
    <AppLayout breadcrumbs={[{ label: '保存した記事' }]}>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">保存した記事</h1>
          <p className="text-muted-foreground">
            「役立つ」と感じた記事がここに保存されます。いつでも見返すことができます。
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="bg-card rounded-lg border p-6">
            <div className="mb-2 flex items-center gap-2">
              <BookOpen className="text-primary h-5 w-5" />
              <span className="text-2xl font-bold">{savedCount}</span>
            </div>
            <p className="text-muted-foreground text-sm">保存した記事</p>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <div className="mb-2 flex items-center gap-2">
              <MessageCircle className="text-primary h-5 w-5" />
              <span className="text-2xl font-bold">{commentedCount}</span>
            </div>
            <p className="text-muted-foreground text-sm">コメントした記事</p>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <div className="mb-2 flex items-center gap-2">
              <Users className="text-primary h-5 w-5" />
              <span className="text-2xl font-bold">
                {participatedSessionsCount}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">参加したセッション</p>
          </div>
        </div>

        {/* Saved Articles List */}
        <ArticleList
          articles={savedArticles}
          emptyMessage="保存した記事がありません"
        />
      </div>
    </AppLayout>
  )
}
