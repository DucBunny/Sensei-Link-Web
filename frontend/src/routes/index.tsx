import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/articles/pages/HomePage'

export const Route = createFileRoute('/')({
  component: HomePage,
})
