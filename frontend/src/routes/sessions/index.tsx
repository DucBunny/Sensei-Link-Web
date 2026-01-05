import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/AppLayout'

function SessionsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">交流セッション</h1>
        <p className="text-muted-foreground mb-8">
          同じ興味を持つ教師とつながるためにセッションに参加しましょう
        </p>
        
        {/* Placeholder - will be implemented in Phase 4 */}
        <div className="p-8 border rounded-lg text-center text-muted-foreground">
          セッション一覧はここに表示されます
        </div>
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/sessions/')({
  component: SessionsPage,
})
