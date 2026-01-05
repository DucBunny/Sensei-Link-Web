/**
 * Interaction types
 */
export type InteractionType = 'useful' | 'comment'

/**
 * Interaction entity
 */
export interface Interaction {
  id: string
  articleId: string
  userId: string
  type: InteractionType
  content?: string // Required if type is 'comment'
  createdAt: string // ISO date string
}

/**
 * Input for creating a new interaction
 */
export interface CreateInteractionInput {
  articleId: string
  userId: string
  type: InteractionType
  content?: string // Required if type is 'comment'
}

