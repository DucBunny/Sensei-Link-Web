import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/AppLayout'
import { useState } from 'react'

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <AppLayout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onCreateArticle={() => {
        // Will be implemented in Phase 2
        console.log('Create article clicked')
      }}
    >
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">センセイリンクへようこそ</h1>
        <p className="text-muted-foreground mb-8">
          教育の知見を発見し、同僚の教師と共有しましょう
        </p>
        
        {/* Placeholder for ArticleList - will be implemented in Phase 2 */}
        <div className="grid gap-4">
          <div className="p-8 border rounded-lg text-center text-muted-foreground">
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
