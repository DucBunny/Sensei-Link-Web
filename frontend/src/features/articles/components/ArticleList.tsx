'use client'

import { ArticleCard } from './ArticleCard'
import type { Article } from '../types/article'

interface ArticleListProps {
  articles: Array<Article>
  emptyMessage?: string
}

export function ArticleList({
  articles,
  emptyMessage = '記事が見つかりません',
}: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-12 text-center">
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
