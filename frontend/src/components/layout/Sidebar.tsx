import { Bell, Heart, Home, LogIn, LogOut, Users } from 'lucide-react'
import type { UserProfile, ViewState } from '@/types'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  view: ViewState
  setView: (view: ViewState) => void
  currentUser: UserProfile | null
  unreadCount: number
  onLogout: () => void
  onLoginClick: () => void
}

export const Sidebar = ({
  view,
  setView,
  currentUser,
  unreadCount,
  onLogout,
  onLoginClick,
}: SidebarProps) => {
  const navItemClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium cursor-pointer ${
      active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
    }`

  return (
    <div className="fixed top-0 left-0 z-50 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-3 border-b border-slate-100 p-6">
        <div className="rounded-lg bg-blue-600 p-1.5 text-white">
          <Users size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">
          先生リンク
        </span>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <button
          onClick={() => setView('home')}
          className={navItemClass(view === 'home' || view === 'detail')}>
          <Home size={20} /> ホーム
        </button>

        {currentUser && (
          <>
            <button
              onClick={() => setView('profile')}
              className={navItemClass(view === 'profile')}>
              <Heart size={20} /> お気に入り
            </button>
            <button
              onClick={() => setView('notifications')}
              className={`relative ${navItemClass(view === 'notifications')}`}>
              <Bell size={20} /> 通知
              {unreadCount > 0 && (
                <span className="absolute right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </>
        )}
      </nav>

      <div className="border-t border-slate-100 p-4">
        {currentUser ? (
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
              <img
                src={currentUser.avatar}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold text-slate-800">
                {currentUser.name}
              </p>
              <button
                onClick={onLogout}
                className="flex cursor-pointer items-center gap-1 text-xs text-red-500 hover:underline">
                <LogOut size={10} /> ログアウト
              </button>
            </div>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={onLoginClick}
            className="w-full gap-2">
            <LogIn size={16} /> ログイン
          </Button>
        )}
      </div>
    </div>
  )
}
