import React from 'react'
import { BookOpen, ChevronRight, ThumbsUp, Users } from 'lucide-react'
import type { Article, Category, UserProfile } from '@/types'
import { Badge } from '@/components/ui/badge'

interface HomeProps {
  currentUser: UserProfile | null
  filteredArticles: Array<Article>
  selectedCategory: Category
  setSelectedCategory: (cat: Category) => void
  goToDetail: (article: Article) => void
  likes: Record<number, boolean>
}

const CATEGORIES: Array<Category> = [
  'すべて',
  '学級経営',
  '指導法',
  '生徒心理',
  '教育ICT',
]

export const Home: React.FC<HomeProps> = ({
  currentUser,
  filteredArticles,
  selectedCategory,
  setSelectedCategory,
  goToDetail,
  likes,
}) => {
  return (
    <div className="animate-in fade-in space-y-6 pb-20 duration-500">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-200 md:p-10">
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">
            こんにちは、{currentUser ? currentUser.name : '先生'}！ 👋
          </h1>
          <p className="max-w-lg text-sm text-blue-100 md:text-lg">
            今日はクラスのどんな課題を解決したいですか？
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 transform opacity-10">
          <BookOpen size={200} />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800">トピックを探す</h2>
        <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'transform bg-slate-800 text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => goToDetail(article)}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
            <div className="absolute top-0 left-0 h-full w-1 -translate-x-full transform bg-blue-500 transition-transform duration-300 group-hover:translate-x-0" />

            <div className="mb-3 flex items-start justify-between">
              <Badge variant={article.hasSession ? 'hot' : 'primary'}>
                {article.category}
              </Badge>
              <span className="flex items-center gap-1 rounded bg-slate-50 px-2 py-1 text-xs font-medium text-slate-400">
                <BookOpen size={12} /> {article.readTime}
              </span>
            </div>

            <h3 className="mb-2 text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600">
              {article.title}
            </h3>

            <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
              {article.summary}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp
                    size={14}
                    className={
                      likes[article.id] ? 'fill-blue-500 text-blue-500' : ''
                    }
                  />
                  {article.interestedCount + (likes[article.id] ? 1 : 0)}
                </span>
                {article.hasSession && (
                  <span className="flex animate-pulse items-center gap-1 font-medium text-orange-600">
                    <Users size={14} /> Hot Topic
                  </span>
                )}
              </div>
              <span className="flex items-center text-xs font-semibold text-blue-600 transition-transform group-hover:translate-x-1">
                今すぐ読む <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
