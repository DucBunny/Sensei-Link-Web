import type { Topic } from '@/features/topics/types/topic'
import type { User } from '@/api/users'

/**
 * Article entity
 */
export interface Article {
  id: string
  title: string
  content: string
  summary: string
  topicId: string
  topic?: Topic
  authorId: string
  author?: User
  readTime: number // minutes
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

/**
 * Input for creating a new article
 */
export interface CreateArticleInput {
  title: string
  content: string
  summary?: string
  topicId: string
  authorId: string
}

/**
 * Input for updating an article
 */
export interface UpdateArticleInput {
  title?: string
  content?: string
  summary?: string
  topicId?: string
}

/**
 * Article with computed stats
 */
export interface ArticleWithStats extends Article {
  usefulCount: number
  commentCount: number
  isUseful?: boolean // For current user
  isSaved?: boolean // For current user
}

