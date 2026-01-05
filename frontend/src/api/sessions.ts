import { getStorageItem, setStorageItem } from '@/lib/localStorage'
import { STORAGE_KEYS, SESSION_MIN_PARTICIPANTS } from '@/lib/constants'
import type { ConnectionSession, CreateSessionInput } from '@/features/sessions/types/session'
import { MOCK_SESSIONS } from '@/lib/mockData'
import { getUsefulCount } from './interactions'

/**
 * Get all sessions
 */
export function getAllSessions(): ConnectionSession[] {
  const sessions = getStorageItem<ConnectionSession[]>(STORAGE_KEYS.SESSIONS) || []
  
  // If no sessions in storage, return mock data
  if (sessions.length === 0) {
    return MOCK_SESSIONS
  }
  
  return sessions
}

/**
 * Get session by ID
 */
export function getSessionById(id: string): ConnectionSession | null {
  const sessions = getAllSessions()
  return sessions.find((session) => session.id === id) || null
}

/**
 * Get sessions for a specific article
 */
export function getSessionsByArticle(articleId: string): ConnectionSession[] {
  const sessions = getAllSessions()
  return sessions.filter((session) => session.articleId === articleId)
}

/**
 * Create a new session
 */
export function createSession(data: CreateSessionInput): ConnectionSession {
  const sessions = getAllSessions()

  const newSession: ConnectionSession = {
    id: `session-${Date.now()}`,
    articleId: data.articleId,
    topicId: data.topicId,
    title: data.title,
    description: data.description,
    goal: data.goal,
    status: 'open',
    participantIds: [],
    minParticipants: data.minParticipants || SESSION_MIN_PARTICIPANTS,
    createdAt: new Date().toISOString(),
  }

  const updatedSessions = [...sessions, newSession]
  setStorageItem(STORAGE_KEYS.SESSIONS, updatedSessions)

  return newSession
}

/**
 * Join a session
 */
export function joinSession(sessionId: string, userId: string): boolean {
  const sessions = getAllSessions()
  const sessionIndex = sessions.findIndex((s) => s.id === sessionId)

  if (sessionIndex === -1) {
    return false // Session not found
  }

  const session = sessions[sessionIndex]

  // Check if user already joined
  if (session.participantIds.includes(userId)) {
    return true // Already joined
  }

  // Add user to participants
  const updatedSession: ConnectionSession = {
    ...session,
    participantIds: [...session.participantIds, userId],
    status: session.participantIds.length + 1 >= session.minParticipants ? 'connecting' : 'open',
  }

  const updatedSessions = [...sessions]
  updatedSessions[sessionIndex] = updatedSession
  setStorageItem(STORAGE_KEYS.SESSIONS, updatedSessions)

  return true
}

/**
 * Leave a session
 */
export function leaveSession(sessionId: string, userId: string): boolean {
  const sessions = getAllSessions()
  const sessionIndex = sessions.findIndex((s) => s.id === sessionId)

  if (sessionIndex === -1) {
    return false // Session not found
  }

  const session = sessions[sessionIndex]

  // Remove user from participants
  const updatedSession: ConnectionSession = {
    ...session,
    participantIds: session.participantIds.filter((id) => id !== userId),
    status: session.participantIds.length - 1 < session.minParticipants ? 'open' : 'connecting',
  }

  const updatedSessions = [...sessions]
  updatedSessions[sessionIndex] = updatedSession
  setStorageItem(STORAGE_KEYS.SESSIONS, updatedSessions)

  return true
}

/**
 * Check if article is eligible for session
 */
export function isArticleEligibleForSession(articleId: string): boolean {
  const usefulCount = getUsefulCount(articleId)
  return usefulCount >= SESSION_MIN_PARTICIPANTS
}

/**
 * Check if session exists for article
 */
export function hasSessionForArticle(articleId: string): boolean {
  const sessions = getSessionsByArticle(articleId)
  return sessions.length > 0
}

/**
 * Initialize sessions (load mock data if empty)
 */
export function initializeSessions(): void {
  const existing = getStorageItem<ConnectionSession[]>(STORAGE_KEYS.SESSIONS)
  if (!existing || existing.length === 0) {
    setStorageItem(STORAGE_KEYS.SESSIONS, MOCK_SESSIONS)
  }
}

