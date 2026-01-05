import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  ThumbsUp,
  User,
  Users,
} from 'lucide-react'
import type { Article, UserProfile } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ArticleDetailProps {
  article: Article | null
  currentUser: UserProfile | null
  onBack: () => void
  likes: Record<number, boolean>
  onLike: (id: number) => void
  comments: Record<number, string>
  onComment: (id: number, text: string) => void
  registeredSessions: Record<number, boolean>
  onRegisterSession: (id: number) => void
}

export const ArticleDetail = ({
  article,
  currentUser,
  onBack,
  likes,
  onLike,
  comments,
  onComment,
  registeredSessions,
  onRegisterSession,
}: ArticleDetailProps) => {
  const [commentInput, setCommentInput] = useState('')

  if (!article) return null

  const isLiked = likes[article.id]
  const userComment = comments[article.id]
  const isRegistered = registeredSessions[article.id]

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      onComment(article.id, commentInput)
      setCommentInput('')
    }
  }

  return (
    <div className="animate-in slide-in-from-right pb-24 duration-300">
      {/* Navbar for Mobile */}
      <div className="sticky top-0 z-10 -mx-4 mb-4 flex items-center gap-3 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur-md md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full">
          <ArrowLeft size={20} />
        </Button>
        <span className="flex-1 truncate font-semibold text-slate-800">
          {article.category}
        </span>
      </div>

      <div className="mx-auto max-w-5xl rounded-none bg-white p-0 md:rounded-2xl md:border md:border-slate-100 md:p-8 md:shadow-sm">
        <div className="mb-6 hidden md:block">
          <Button
            variant="ghost"
            onClick={onBack}
            className="pl-0 hover:bg-transparent hover:text-blue-600">
            <ArrowLeft size={16} className="mr-2" /> 戻る
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl leading-tight font-bold text-slate-900 md:text-4xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <Badge variant="secondary">{article.category}</Badge>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {article.readTime} 読む
            </span>
            <span className="flex items-center gap-1 font-medium text-blue-600">
              <Users size={16} /> {article.interestedCount} 人が関心
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-slate prose-lg mb-10 max-w-none leading-7 text-slate-800 md:leading-8">
          {article.content}
        </div>

        <hr className="my-8 border-slate-100" />

        {/* Interactions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <span className="text-sm font-medium text-slate-700">
              この記事は役に立ちましたか？
            </span>
            <Button
              variant={isLiked ? 'primary' : 'secondary'}
              onClick={() => onLike(article.id)}
              className={`gap-2 transition-all duration-300 ${isLiked ? 'scale-105' : ''}`}>
              <ThumbsUp size={16} className={isLiked ? 'fill-white' : ''} />
              {isLiked ? '保存済み' : '役立つ'}
            </Button>
          </div>

          {/* Comments */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
              クイックフィードバック
            </h3>
            {!userComment ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  maxLength={100}
                  placeholder="例：試してみたら効果がありました..."
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!commentInput}
                  variant="primary"
                  className="shrink-0">
                  <Send size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <div className="shrink-0 rounded-full bg-blue-100 p-1.5">
                  <User size={14} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {currentUser ? currentUser.name : 'ゲスト'}のコメント：
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    "{userComment}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Session CTA */}
          {article.hasSession && (
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 via-white to-blue-50 p-6 shadow-sm">
              <div className="relative z-10 space-y-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold tracking-wider text-indigo-700 uppercase">
                  <Users size={12} /> コミュニティ
                </div>
                <h3 className="text-xl font-bold text-indigo-950">
                  このトピックが注目されています！ 🔥
                </h3>

                {!isRegistered ? (
                  <Button
                    onClick={() => onRegisterSession(article.id)}
                    className="w-full gap-2 bg-indigo-600 text-white sm:w-auto">
                    <Calendar size={16} /> 交流会に参加登録する
                  </Button>
                ) : (
                  <div className="inline-flex w-full flex-col items-center rounded-xl border border-green-200 bg-white p-4 shadow-sm">
                    <div className="mb-1 flex items-center gap-2 font-bold text-green-600">
                      <CheckCircle2 size={18} /> 登録完了
                    </div>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {article.sessionTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
