import type React from 'react'

export type Category = 'すべて' | '学級経営' | '指導法' | '生徒心理' | '教育ICT'
export type ViewState = 'home' | 'detail' | 'profile' | 'notifications'

export interface UserProfile {
  name: string
  email: string
  avatar: string
  school: string
}

export interface Article {
  id: number
  title: string
  category: Category
  summary: string
  content: React.ReactNode
  readTime: string
  interestedCount: number
  hasSession: boolean
  sessionTime?: string
}

export interface NotificationItem {
  id: number
  type: 'session' | 'system'
  title: string
  message: string
  time: string
  read: boolean
}
