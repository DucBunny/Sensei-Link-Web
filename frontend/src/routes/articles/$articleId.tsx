import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/AppLayout'
import { getArticleById } from '@/api/articles'

function ArticleDetailPage() {
  const { articleId } = Route.useParams()
  const article = getArticleById(articleId)

  if (!article) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold">記事が見つかりません</h1>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="text-muted-foreground mb-6">
          <span>読了時間: {article.readTime}分</span>
          {article.topic && (
            <>
              <span className="mx-2">•</span>
              <span>{article.topic.nameJa}</span>
            </>
          )}
        </div>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">{article.summary}</p>
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>
        
        {/* Placeholder for interactions - will be implemented in Phase 3 */}
        <div className="mt-8 p-4 border rounded-lg text-center text-muted-foreground">
          インタラクションコンポーネントはここに表示されます
        </div>
      </div>
    </AppLayout>
  )
}

export const Route = createFileRoute('/articles/$articleId')({
  component: ArticleDetailPage,
})
