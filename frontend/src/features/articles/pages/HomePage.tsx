'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ConnectionSession } from '@/features/sessions'
import type { Article } from '../types/article'
import { AppLayout } from '@/components/layout/AppLayout'
import { TopicFilter } from '@/features/topics/components/TopicFilter'
import { ArticleList } from '@/features/articles/components/ArticleList'
import { CreateArticleDialog } from '@/features/articles/components/CreateArticleDialog'
import { getAllArticles } from '@/api/articles'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { CreateSessionDialog } from '@/features/sessions/components/CreateSessionDialog'
import { JoinSessionDialog } from '@/features/sessions/components/JoinSessionDialog'
import { getCurrentUser } from '@/api'
import { getSessionsByArticle, hasSessionForArticle } from '@/api/sessions'

export function HomePage() {
  const currentUser = getCurrentUser()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopicIds, setSelectedTopicIds] = useState<Array<string>>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Session: open modal create/detail session
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [openSession, setOpenSession] = useState(false)
  // Handle click to session on article card
  const hasSession = hasSessionForArticle(selectedArticle?.id as string)
  const [activeSession, setActiveSession] = useState<ConnectionSession | null>(
    null,
  )

  const handleSessionClick = (article: Article) => {
    const session = getSessionsByArticle(article.id)

    setSelectedArticle(article)
    setActiveSession(session)
    setOpenSession(true)
  }

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
      onCreateArticle={() => setIsCreateDialogOpen(true)}>
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

        <ArticleList articles={articles} onSessionClick={handleSessionClick} />

        <CreateArticleDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />

        <Dialog open={openSession} onOpenChange={setOpenSession}>
          <DialogContent>
            {selectedArticle &&
              (currentUser.id === selectedArticle.authorId && !hasSession ? (
                <CreateSessionDialog
                  article={selectedArticle}
                  setOpenSession={setOpenSession}
                />
              ) : activeSession ? (
                <JoinSessionDialog
                  session={activeSession}
                  currentUserId={currentUser.id}
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  セッションがまだ作成されていません
                </p>
              ))}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
