/**
 * Storage keys for LocalStorage
 */
export const STORAGE_KEYS = {
  ARTICLES: 'sensei-link-articles',
  INTERACTIONS: 'sensei-link-interactions',
  SESSIONS: 'sensei-link-sessions',
  TOPICS: 'sensei-link-topics',
  USER_PREFERENCES: 'sensei-link-user-preferences',
  CURRENT_USER: 'sensei-link-current-user',
  MOCK_DATA_LOADED: 'sensei-link-mock-data-loaded',
} as const

/**
 * Session eligibility threshold
 */
export const SESSION_MIN_PARTICIPANTS = 5

/**
 * Default read time (minutes) for articles
 */
export const DEFAULT_READ_TIME = 2
