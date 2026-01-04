import { getStorageItem, setStorageItem } from '@/lib/localStorage'
import { STORAGE_KEYS } from '@/lib/constants'
import type { Interaction, CreateInteractionInput } from '@/features/interactions/types/interaction'
import { MOCK_INTERACTIONS } from '@/lib/mockData'

/**
 * Get all interactions
 */
export function getAllInteractions(): Interaction[] {
  const interactions = getStorageItem<Interaction[]>(STORAGE_KEYS.INTERACTIONS) || []
  
  // If no interactions in storage, return mock data
  if (interactions.length === 0) {
    return MOCK_INTERACTIONS
  }
  
  return interactions
}

/**
 * Get interactions for a specific article
 */
export function getInteractionsByArticle(articleId: string): Interaction[] {
  const interactions = getAllInteractions()
  return interactions.filter((interaction) => interaction.articleId === articleId)
}

/**
 * Get interactions by a specific user
 */
export function getUserInteractions(userId: string): Interaction[] {
  const interactions = getAllInteractions()
  return interactions.filter((interaction) => interaction.userId === userId)
}

/**
 * Add a new interaction
 */
export function addInteraction(data: CreateInteractionInput): Interaction {
  const interactions = getAllInteractions()
  
  // Validate comment content
  if (data.type === 'comment' && (!data.content || data.content.trim().length === 0)) {
    throw new Error('Comment content is required')
  }

  const newInteraction: Interaction = {
    id: `interaction-${Date.now()}`,
    articleId: data.articleId,
    userId: data.userId,
    type: data.type,
    content: data.content,
    createdAt: new Date().toISOString(),
  }

  const updatedInteractions = [...interactions, newInteraction]
  setStorageItem(STORAGE_KEYS.INTERACTIONS, updatedInteractions)

  return newInteraction
}

/**
 * Remove an interaction
 */
export function removeInteraction(id: string): boolean {
  const interactions = getAllInteractions()
  const filteredInteractions = interactions.filter((i) => i.id !== id)

  if (filteredInteractions.length === interactions.length) {
    return false // Interaction not found
  }

  setStorageItem(STORAGE_KEYS.INTERACTIONS, filteredInteractions)
  return true
}

/**
 * Check if user marked article as useful
 */
export function isArticleUsefulForUser(articleId: string, userId: string): boolean {
  const interactions = getAllInteractions()
  return interactions.some(
    (interaction) =>
      interaction.articleId === articleId &&
      interaction.userId === userId &&
      interaction.type === 'useful',
  )
}

/**
 * Get useful count for an article
 */
export function getUsefulCount(articleId: string): number {
  const interactions = getInteractionsByArticle(articleId)
  return interactions.filter((i) => i.type === 'useful').length
}

/**
 * Get comment count for an article
 */
export function getCommentCount(articleId: string): number {
  const interactions = getInteractionsByArticle(articleId)
  return interactions.filter((i) => i.type === 'comment').length
}

/**
 * Initialize interactions (load mock data if empty)
 */
export function initializeInteractions(): void {
  const existing = getStorageItem<Interaction[]>(STORAGE_KEYS.INTERACTIONS)
  if (!existing || existing.length === 0) {
    setStorageItem(STORAGE_KEYS.INTERACTIONS, MOCK_INTERACTIONS)
  }
}

