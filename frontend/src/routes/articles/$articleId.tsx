import { createFileRoute } from '@tanstack/react-router'
import { ArticleDetailPage } from '@/features/articles/pages/ArticleDetailPage'

export const Route = createFileRoute('/articles/$articleId')({
  component: ArticleDetailPage,
})
