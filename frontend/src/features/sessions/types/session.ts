import type { Topic } from '@/features/topics/types/topic'

/**
 * Session status
 */
export type SessionStatus = 'open' | 'connecting' | 'closed'

/**
 * Connection Session entity
 */
export interface ConnectionSession {
  id: string
  articleId: string
  topicId: string
  topic?: Topic
  title: string
  description: string
  goal: string // Mục tiêu giao lưu
  status: SessionStatus
  participantIds: string[]
  minParticipants: number
  createdAt: string // ISO date string
  expiresAt?: string // ISO date string
}

/**
 * Input for creating a new session
 */
export interface CreateSessionInput {
  articleId: string
  topicId: string
  title: string
  description: string
  goal: string
  minParticipants?: number
}
