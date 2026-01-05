'use client'

import { useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ArrowLeft, Clock } from 'lucide-react'
import { AppLayout } from '@/components/layout/AppLayout'
import { getArticleById } from '@/api/articles'
import { TopicTag } from '@/features/topics/components/TopicTag'
import { UsefulButton } from '@/features/interactions/components/UsefulButton'
import { InteractionStats } from '@/features/interactions/components/InteractionStats'
import { CommentForm } from '@/features/interactions/components/CommentForm'
import { CommentList } from '@/features/interactions/components/CommentList'
import { Button } from '@/components/ui/button'

export function ArticleDetailPage() {
  const { articleId } = useParams({ strict: false })
  const article = getArticleById(articleId as string)
  const [refreshKey, setRefreshKey] = useState(0)

  if (!article) {
    return (
      <AppLayout
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: '記事が見つかりません' },
        ]}>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">記事が見つかりません</h1>
        </div>
      </AppLayout>
    )
  }

  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
    locale: ja,
  })

  const handleInteractionUpdate = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <AppLayout
      breadcrumbs={[{ label: 'ホーム', href: '/' }, { label: '記事詳細' }]}>
      <div className="container mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            {article.topic && (
              <TopicTag topic={article.topic} variant="outline" />
            )}
            <span className="text-muted-foreground text-sm">{timeAgo}</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
          <div className="mb-4 flex items-center justify-between">
            <InteractionStats articleId={article.id} />
            <UsefulButton
              articleId={article.id}
              onUpdate={handleInteractionUpdate}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-card mb-8 rounded-lg border p-6">
          <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>読了時間: {article.readTime}分</span>
          </div>
          <p className="text-foreground mb-4 text-lg font-medium">
            {article.summary}
          </p>
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        {/* Interactions */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">コメント</h2>
            <div className="mb-6">
              <CommentForm
                articleId={article.id}
                onCommentAdded={handleInteractionUpdate}
              />
            </div>
            <CommentList key={refreshKey} articleId={article.id} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
