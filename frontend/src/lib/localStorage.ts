/**
 * Get item from localStorage with type safety
 */
export function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const item = localStorage.getItem(key)
    if (!item) {
      return null
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return null
  }
}

/**
 * Set item to localStorage with type safety
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Clear all Sensei Link data from localStorage
 */
export function clearAllStorage(): void {
  if (typeof window === 'undefined') {
    return
  }

  const keys = Object.values(STORAGE_KEYS)
  keys.forEach((key) => {
    localStorage.removeItem(key)
  })
}

// Import STORAGE_KEYS
import { STORAGE_KEYS } from './constants'

