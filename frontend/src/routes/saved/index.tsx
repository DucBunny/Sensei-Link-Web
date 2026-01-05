import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/AppLayout'

function SavedArticlesPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">保存した記事</h1>
        <p className="text-muted-foreground mb-8">
          保存した記事がここに表示されます
        </p>
        
        {/* Placeholder - will be implemented in Phase 3 */}
        <div className="p-8 border rounded-lg text-center text-muted-foreground">
          保存した記事一覧はここに表示されます
        </div>
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/saved/')({
  component: SavedArticlesPage,
})
