'use client'

import { useState, useMemo, useEffect } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { TopicFilter } from '@/features/topics/components/TopicFilter'
import { ArticleList } from '@/features/articles/components/ArticleList'
import { CreateArticleDialog } from '@/features/articles/components/CreateArticleDialog'
import { getAllArticles } from '@/api/articles'

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Listen for article interaction changes to refresh list
  useEffect(() => {
    const handleInteractionChange = () => {
      setRefreshKey((prev) => prev + 1)
    }
    
    window.addEventListener('articleInteraction', handleInteractionChange)
    
    return () => {
      window.removeEventListener('articleInteraction', handleInteractionChange)
    }
  }, [])

  const articles = useMemo(() => {
    return getAllArticles({
      topicIds: selectedTopicIds.length > 0 ? selectedTopicIds : undefined,
      search: searchQuery || undefined,
      sortBy: 'newest',
    })
  }, [selectedTopicIds, searchQuery, refreshKey])

  return (
    <AppLayout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onCreateArticle={() => setIsCreateDialogOpen(true)}
    >
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">センセイリンクへようこそ</h1>
          <p className="text-muted-foreground">
            教育の知見を発見し、同僚の教師と共有しましょう
          </p>
        </div>

        <div className="mb-6">
          <TopicFilter
            selectedTopicIds={selectedTopicIds}
            onTopicChange={setSelectedTopicIds}
          />
        </div>

        <ArticleList articles={articles} />

        <CreateArticleDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </AppLayout>
  )
}

