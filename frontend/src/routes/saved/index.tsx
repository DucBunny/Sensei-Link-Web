import { createFileRoute } from '@tanstack/react-router'
import { SavedArticlesPage } from '@/features/articles/pages/SavedArticlesPage'

export const Route = createFileRoute('/saved/')({
  component: SavedArticlesPage,
})
