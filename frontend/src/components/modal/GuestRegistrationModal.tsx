import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GuestRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  onSwitchToLogin: () => void
}

export const GuestRegistrationModal = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
}: GuestRegistrationModalProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    school: '',
    phone: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
    setForm({ name: '', email: '', school: '', phone: '' })
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">ゲスト参加登録</h3>
            <p className="text-xs text-slate-500">
              ログインすると次回から入力が不要になります
            </p>
          </div>
          <Button
            variant="icon"
            size="icon-sm"
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-slate-600">
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">氏名</label>
            <input
              required
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="お名前を入力してください"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              メールアドレス
            </label>
            <input
              required
              type="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="example@school.edu.jp"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                電話番号
              </label>
              <input
                required
                type="tel"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="090-1234-..."
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                勤務先（学校名）
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="〇〇高等学校"
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onSwitchToLogin}>
              ログインして参加
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              ゲストとして参加
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
