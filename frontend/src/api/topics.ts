import { getStorageItem, setStorageItem } from '@/lib/localStorage'
import { STORAGE_KEYS } from '@/lib/constants'
import type { Topic } from '@/features/topics/types/topic'
import { MOCK_TOPICS } from '@/lib/mockData'

/**
 * Get all topics
 */
export function getAllTopics(): Topic[] {
  const topics = getStorageItem<Topic[]>(STORAGE_KEYS.TOPICS)
  
  // If no topics in storage, return mock data
  if (!topics || topics.length === 0) {
    return MOCK_TOPICS
  }
  
  return topics
}

/**
 * Get topic by ID
 */
export function getTopicById(id: string): Topic | null {
  const topics = getAllTopics()
  return topics.find((topic) => topic.id === id) || null
}

/**
 * Initialize topics (load mock data if empty)
 */
export function initializeTopics(): void {
  const existing = getStorageItem<Topic[]>(STORAGE_KEYS.TOPICS)
  if (!existing || existing.length === 0) {
    setStorageItem(STORAGE_KEYS.TOPICS, MOCK_TOPICS)
  }
}

