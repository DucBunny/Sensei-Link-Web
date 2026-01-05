'use client'

import type { Article } from '../types/article'
import { ArticleCard } from './ArticleCard'

interface ArticleListProps {
  articles: Article[]
  emptyMessage?: string
}

export function ArticleList({ articles, emptyMessage = '記事が見つかりません' }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

