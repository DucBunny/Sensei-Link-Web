import { getStorageItem, setStorageItem } from '@/lib/localStorage'
import { STORAGE_KEYS } from '@/lib/constants'
import { MOCK_USERS, MOCK_USER_ACCOUNTS } from '@/lib/mockData'

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

export interface UserAccount extends User {
  password: string
}

/**
 * User preferences
 */
export interface UserPreferences {
  selectedTopics: Array<string> // Topic IDs
  savedArticles: Array<string> // Article IDs
}

/**
 * Get current user (for demo, return first user)
 */
export function getCurrentUser(): User | null {
  const user = getStorageItem<User>(STORAGE_KEYS.CURRENT_USER)

  if (user) {
    return user
  }

  return null
}

/**
 * Set current user
 */
export function setCurrentUser(user: User): void {
  setStorageItem(STORAGE_KEYS.CURRENT_USER, user)
}

/**
 * Clear current user
 */
export function clearCurrentUser(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
}

/**
 * Get user preferences
 */
export function getUserPreferences(): UserPreferences {
  const preferences = getStorageItem<UserPreferences>(
    STORAGE_KEYS.USER_PREFERENCES,
  )

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
export function updateUserPreferences(
  preferences: Partial<UserPreferences>,
): void {
  const current = getUserPreferences()
  const updated = { ...current, ...preferences }
  setStorageItem(STORAGE_KEYS.USER_PREFERENCES, updated)
}

/**
 * Get saved article IDs
 */
export function getSavedArticles(): Array<string> {
  const preferences = getUserPreferences()
  return preferences.savedArticles
}

/**
 * Get all user accounts (with passwords) from storage or mock data
 */
export function getAllAccounts(): Array<UserAccount> {
  const accounts = getStorageItem<Array<UserAccount>>(
    STORAGE_KEYS.USER_ACCOUNTS,
  )
  if (accounts && accounts.length > 0) {
    return accounts
  }

  setStorageItem(STORAGE_KEYS.USER_ACCOUNTS, MOCK_USER_ACCOUNTS)
  return MOCK_USER_ACCOUNTS
}

/**
 * Authenticate user by email and password
 */
export function authenticateUser(email: string, password: string): User | null {
  const accounts = getAllAccounts()
  const account = accounts.find(
    (item) =>
      item.email?.toLowerCase() === email.toLowerCase() &&
      item.password === password,
  )

  if (!account) {
    return null
  }

  const { password: _password, ...user } = account
  setCurrentUser(user)
  return user
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

  const existingPreferences = getStorageItem<UserPreferences>(
    STORAGE_KEYS.USER_PREFERENCES,
  )
  if (!existingPreferences) {
    setStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
      selectedTopics: [],
      savedArticles: [],
    })
  }

  const existingAccounts = getStorageItem<Array<UserAccount>>(
    STORAGE_KEYS.USER_ACCOUNTS,
  )
  if (!existingAccounts || existingAccounts.length === 0) {
    setStorageItem(STORAGE_KEYS.USER_ACCOUNTS, MOCK_USER_ACCOUNTS)
  }
}

/**
 * Get user by ID
 */
export function getUserById(userId: string): User | null {
  const users = getStorageItem<Array<User>>(STORAGE_KEYS.USER_ACCOUNTS)
  if (users) {
    const user = users.find((u) => u.id === userId)
    return user || null
  }
  return null
}
