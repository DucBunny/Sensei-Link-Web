import { getAllTopics } from './topics'
import { getCurrentUser, getSavedArticles } from './users'
import { getSessionsForUser } from './sessions'
import type {
  Article,
  CreateArticleInput,
  UpdateArticleInput,
} from '@/features/articles/types/article'
import { getStorageItem, setStorageItem } from '@/lib/localStorage'
import { STORAGE_KEYS } from '@/lib/constants'
import { MOCK_ARTICLES } from '@/lib/mockData'

/**
 * Get all articles with optional filters
 */
export function getAllArticles(filters?: {
  topicIds?: Array<string>
  search?: string
  sortBy?: 'newest' | 'popular' | 'trending'
}): Array<Article> {
  let articles = getStorageItem<Array<Article>>(STORAGE_KEYS.ARTICLES) || []

  // If no articles in storage, return mock data
  if (articles.length === 0) {
    articles = MOCK_ARTICLES
  }

  // Apply filters
  if (filters?.topicIds && filters.topicIds.length > 0) {
    articles = articles.filter((article) =>
      filters.topicIds!.includes(article.topicId),
    )
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) ||
        article.summary.toLowerCase().includes(searchLower),
    )
  }

  // Apply sorting
  if (filters?.sortBy === 'newest') {
    articles = [...articles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  } else if (filters?.sortBy === 'popular') {
    // Sort by useful count (would need to calculate from interactions)
    // For now, just sort by newest
    articles = [...articles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  } else if (filters?.sortBy === 'trending') {
    // Sort by recent interactions (would need to calculate from interactions)
    // For now, just sort by newest
    articles = [...articles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }

  // Enrich with topic and author data
  const topics = getAllTopics()
  const currentUser = getCurrentUser()

  return articles.map((article) => ({
    ...article,
    topic: topics.find((t) => t.id === article.topicId),
    author: currentUser, // For demo, all articles are by current user
  }))
}

/**
 * Get article by ID
 */
export function getArticleById(id: string): Article | null {
  const articles = getAllArticles()
  const article = articles.find((a) => a.id === id)
  return article || null
}

/**
 * Calculate topic scores for a user
 * - Each session participation/hosting on a topic: +5
 * - Each saved article's topic: +1
 */
export function calculateUserTopicScores(
  userId: string,
): Record<string, number> {
  if (!userId) return {}

  const scores: Record<string, number> = {}
  const articles = getAllArticles()

  // Weight from sessions
  const userSessions = getSessionsForUser(userId)
  userSessions.forEach((session) => {
    scores[session.topicId] = (scores[session.topicId] || 0) + 5
  })

  // Weight from saved articles
  const savedArticleIds = getSavedArticles()
  savedArticleIds.forEach((articleId) => {
    const article = articles.find((item) => item.id === articleId)
    if (article) {
      scores[article.topicId] = (scores[article.topicId] || 0) + 1
    }
  })

  return scores
}

/**
 * Get recommended articles for a user based on joined sessions and saved articles
 */
export function getRecommendedArticlesForUser(
  userId: string,
  limit = 6,
): Array<Article> {
  if (!userId) return []

  const articles = getAllArticles()
  const topicScores = calculateUserTopicScores(userId)

  // No scores, return empty
  if (Object.keys(topicScores).length === 0) return []

  const scored = articles
    .map((article) => ({
      article,
      score: topicScores[article.topicId] || 0,
    }))
    .filter((item) => item.score > 0)

  // Score descending, tie-breaker by newest
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return (
      new Date(b.article.createdAt).getTime() -
      new Date(a.article.createdAt).getTime()
    )
  })

  return scored.slice(0, limit).map((item) => item.article)
}

/**
 * Create a new article
 */
export function createArticle(data: CreateArticleInput): Article {
  const articles = getAllArticles()
  const now = new Date().toISOString()

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = data.content.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const newArticle: Article = {
    id: `article-${Date.now()}`,
    title: data.title,
    content: data.content,
    summary: data.summary || data.content.substring(0, 100) + '...',
    topicId: data.topicId,
    authorId: data.authorId,
    readTime,
    createdAt: now,
    updatedAt: now,
  }

  const updatedArticles = [...articles, newArticle]
  setStorageItem(STORAGE_KEYS.ARTICLES, updatedArticles)

  return newArticle
}

/**
 * Update an article
 */
export function updateArticle(
  id: string,
  updates: UpdateArticleInput,
): Article | null {
  const articles = getAllArticles()
  const articleIndex = articles.findIndex((a) => a.id === id)

  if (articleIndex === -1) {
    return null
  }

  const updatedArticle: Article = {
    ...articles[articleIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  const updatedArticles = [...articles]
  updatedArticles[articleIndex] = updatedArticle
  setStorageItem(STORAGE_KEYS.ARTICLES, updatedArticles)

  return updatedArticle
}

/**
 * Delete an article
 */
export function deleteArticle(id: string): boolean {
  const articles = getAllArticles()
  const filteredArticles = articles.filter((a) => a.id !== id)

  if (filteredArticles.length === articles.length) {
    return false // Article not found
  }

  setStorageItem(STORAGE_KEYS.ARTICLES, filteredArticles)
  return true
}

/**
 * Initialize articles (load mock data if empty)
 */
export function initializeArticles(): void {
  const existing = getStorageItem<Array<Article>>(STORAGE_KEYS.ARTICLES)
  if (!existing || existing.length === 0) {
    setStorageItem(STORAGE_KEYS.ARTICLES, MOCK_ARTICLES)
  }
}
