import {
  CheckCircle2,
  Heart,
  MessageSquare,
  Search,
  ThumbsUp,
} from 'lucide-react'
import type { Article, UserProfile } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface FavouriteProps {
  currentUser: UserProfile | null
  articles: Array<Article>
  likes: Record<number, boolean>
  comments: Record<number, string>
  registeredSessions: Record<number, boolean>
  goToDetail: (article: Article) => void
  onLoginClick: () => void
  goHome: () => void
}

export const Favourite = ({
  currentUser,
  articles,
  likes,
  comments,
  registeredSessions,
  goToDetail,
  onLoginClick,
  goHome,
}: FavouriteProps) => {
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-slate-100 p-4">
          <Heart size={32} className="text-slate-400" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-800">
          ログインが必要です
        </h2>
        <p className="mb-6 text-slate-500">
          お気に入りの記事を保存するにはログインしてください。
        </p>
        <Button onClick={onLoginClick}>ログイン / 新規登録</Button>
      </div>
    )
  }

  const interactedArticles = articles.filter(
    (a) => likes[a.id] || comments[a.id],
  )

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl pb-20 duration-500">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-800">
        <Heart className="text-blue-600" />
        お気に入り・履歴
      </h1>

      {interactedArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
          <div className="mb-4 rounded-full bg-slate-50 p-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mb-1 text-lg font-medium text-slate-900">
            保存されたコンテンツはありません
          </h3>
          <p className="mb-4 max-w-xs text-sm text-slate-500">
            「役立つ」ボタンを押すか、フィードバックを残すとここに保存されます。
          </p>
          <Button variant="outline" onClick={goHome}>
            今すぐ探す
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1">
          {interactedArticles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2 inline-block">
                  {article.category}
                </Badge>
                <h3 className="text-lg font-bold text-slate-800">
                  {article.title}
                </h3>
                <div className="mt-2 flex gap-3">
                  {likes[article.id] && (
                    <span className="flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-2 py-1 text-xs text-blue-700">
                      <ThumbsUp size={12} /> いいね済み
                    </span>
                  )}
                  {registeredSessions[article.id] && (
                    <span className="flex items-center gap-1 rounded border border-green-100 bg-green-50 px-2 py-1 text-xs text-green-700">
                      <CheckCircle2 size={12} /> 登録済み
                    </span>
                  )}
                </div>
                {comments[article.id] && (
                  <div className="relative mt-3 flex gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600 italic">
                    <MessageSquare
                      size={14}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <span>"{comments[article.id]}"</span>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => goToDetail(article)}
                className="self-end md:self-center">
                見直す
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
