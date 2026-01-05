import { getUsefulCount } from './interactions'
import type {
  ConnectionSession,
  CreateSessionInput,
} from '@/features/sessions/types/session'
import { getStorageItem, setStorageItem } from '@/lib/localStorage'
import { SESSION_MIN_PARTICIPANTS, STORAGE_KEYS } from '@/lib/constants'
import { MOCK_SESSIONS } from '@/lib/mockData'

/**
 * Get all sessions
 */
export function getAllSessions(): Array<ConnectionSession> {
  const sessions =
    getStorageItem<Array<ConnectionSession>>(STORAGE_KEYS.SESSIONS) || []

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
export function getSessionsByArticle(
  articleId: string,
): ConnectionSession | undefined {
  const sessions = getAllSessions()
  return sessions.find((session) => session.articleId === articleId)
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
    hostId: data.hostId,
    time: data.time,
  }

  const updatedSessions = [...sessions, newSession]
  setStorageItem(STORAGE_KEYS.SESSIONS, updatedSessions)

  return newSession
}

/**
 * Join a session
 */
export function joinSession(
  sessionId: string,
  userId: string,
  participantInfo?: { email: string; note: string },
): boolean {
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

  // Add user to participants and info
  const updatedSession: ConnectionSession = {
    ...session,
    participantIds: [...session.participantIds, userId],
    participantInfoMap: {
      ...(session.participantInfoMap || {}),
      ...(participantInfo ? { [userId]: participantInfo } : {}),
    },
    status:
      session.participantIds.length + 1 >= session.minParticipants
        ? 'connecting'
        : 'open',
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
    status:
      session.participantIds.length - 1 < session.minParticipants
        ? 'open'
        : 'connecting',
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
  return Boolean(getSessionsByArticle(articleId))
}

/**
 * Initialize sessions (load mock data if empty)
 */
export function initializeSessions(): void {
  const existing = getStorageItem<Array<ConnectionSession>>(
    STORAGE_KEYS.SESSIONS,
  )
  if (!existing || existing.length === 0) {
    setStorageItem(STORAGE_KEYS.SESSIONS, MOCK_SESSIONS)
  }
}
