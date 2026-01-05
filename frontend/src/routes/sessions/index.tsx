import { createFileRoute } from '@tanstack/react-router'
import { SessionsPage } from '@/features/sessions/pages/SessionsPage'

export const Route = createFileRoute('/sessions/')({
  component: SessionsPage,
})
