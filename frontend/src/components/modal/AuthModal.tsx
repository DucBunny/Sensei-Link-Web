import React, { useState } from 'react'
import { Lock, Mail, User, X } from 'lucide-react'
import type { UserProfile } from '@/types'
import { Button } from '@/components/ui/button'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode: 'login' | 'register'
  onAuthComplete: (user: UserProfile) => void
}

export const AuthModal = ({
  isOpen,
  onClose,
  initialMode,
  onAuthComplete,
}: AuthModalProps) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode)
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API Call
    setTimeout(() => {
      const mockUser: UserProfile = {
        name: authMode === 'register' ? form.name : '木村先生',
        email: form.email,
        school: '東京第一高等学校',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      }
      onAuthComplete(mockUser)
      setForm({ email: '', password: '', name: '' })
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-in zoom-in-95 relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h3 className="text-lg font-bold text-slate-800">
            {authMode === 'login' ? 'ログイン' : '新規登録'}
          </h3>
          <Button
            variant="icon"
            size="icon-sm"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {authMode === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                お名前
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute top-3 left-3 text-slate-400"
                />
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-9 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="山田 太郎"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              メールアドレス
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute top-3 left-3 text-slate-400"
              />
              <input
                required
                type="email"
                className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-9 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              パスワード
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute top-3 left-3 text-slate-400"
              />
              <input
                required
                type="password"
                className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-9 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <Button variant="primary" type="submit" className="w-full">
            {authMode === 'login' ? 'ログイン' : 'アカウント作成'}
          </Button>

          <div className="text-center text-xs">
            {authMode === 'login' ? (
              <p className="text-slate-500">
                アカウントをお持ちでないですか？{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="cursor-pointer font-medium text-blue-600 hover:underline">
                  新規登録
                </button>
              </p>
            ) : (
              <p className="text-slate-500">
                すでにアカウントをお持ちですか？{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="cursor-pointer font-medium text-blue-600 hover:underline">
                  ログイン
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
