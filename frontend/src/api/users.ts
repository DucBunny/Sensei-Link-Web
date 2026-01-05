import { getStorageItem, setStorageItem } from '@/lib/localStorage'
import { STORAGE_KEYS } from '@/lib/constants'
import { MOCK_USERS } from '@/lib/mockData'

/**
 * User entity
 */
export interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  createdAt: string // ISO date string
}

/**
 * User preferences
 */
export interface UserPreferences {
  selectedTopics: string[] // Topic IDs
  savedArticles: string[] // Article IDs
}

/**
 * Get current user (for demo, return first user)
 */
export function getCurrentUser(): User {
  const user = getStorageItem<User>(STORAGE_KEYS.CURRENT_USER)
  
  if (user) {
    return user
  }

  // If no user in storage, use first mock user
  const defaultUser = MOCK_USERS[0]
  setStorageItem(STORAGE_KEYS.CURRENT_USER, defaultUser)
  return defaultUser
}

/**
 * Set current user
 */
export function setCurrentUser(user: User): void {
  setStorageItem(STORAGE_KEYS.CURRENT_USER, user)
}

/**
 * Get user preferences
 */
export function getUserPreferences(): UserPreferences {
  const preferences = getStorageItem<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES)
  
  if (preferences) {
    return preferences
  }

  // Default preferences
  const defaultPreferences: UserPreferences = {
    selectedTopics: [],
    savedArticles: [],
  }
  
  setStorageItem(STORAGE_KEYS.USER_PREFERENCES, defaultPreferences)
  return defaultPreferences
}

/**
 * Update user preferences
 */
export function updateUserPreferences(preferences: Partial<UserPreferences>): void {
  const current = getUserPreferences()
  const updated = { ...current, ...preferences }
  setStorageItem(STORAGE_KEYS.USER_PREFERENCES, updated)
}

/**
 * Get saved article IDs
 */
export function getSavedArticles(): string[] {
  const preferences = getUserPreferences()
  return preferences.savedArticles
}

/**
 * Save an article
 */
export function saveArticle(articleId: string): void {
  const preferences = getUserPreferences()
  
  if (!preferences.savedArticles.includes(articleId)) {
    updateUserPreferences({
      savedArticles: [...preferences.savedArticles, articleId],
    })
  }
}

/**
 * Unsave an article
 */
export function unsaveArticle(articleId: string): void {
  const preferences = getUserPreferences()
  updateUserPreferences({
    savedArticles: preferences.savedArticles.filter((id) => id !== articleId),
  })
}

/**
 * Check if article is saved
 */
export function isArticleSaved(articleId: string): boolean {
  const savedArticles = getSavedArticles()
  return savedArticles.includes(articleId)
}

/**
 * Initialize users (load mock data if empty)
 */
export function initializeUsers(): void {
  const existing = getStorageItem<User>(STORAGE_KEYS.CURRENT_USER)
  if (!existing) {
    setStorageItem(STORAGE_KEYS.CURRENT_USER, MOCK_USERS[0])
  }
  
  const existingPreferences = getStorageItem<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES)
  if (!existingPreferences) {
    setStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
      selectedTopics: [],
      savedArticles: [],
    })
  }
}
