import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <AppLayout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onCreateArticle={() => {
        // Will be implemented in Phase 2
        console.log('Create article clicked')
      }}>
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-3xl font-bold">センセイリンクへようこそ</h1>
        <p className="text-muted-foreground mb-8">
          教育の知見を発見し、同僚の教師と共有しましょう
        </p>

        {/* Placeholder for ArticleList - will be implemented in Phase 2 */}
        <div className="grid gap-4">
          <div className="text-muted-foreground rounded-lg border p-8 text-center">
            記事一覧はここに表示されます
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
