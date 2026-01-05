import { useMemo, useState } from 'react'
import { Bell, Heart, Home as HomeIcon, Users } from 'lucide-react'
import { toast } from 'sonner'
import type { Article, Category, UserProfile, ViewState } from '@/types'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/layout/Sidebar'
import { AuthModal } from '@/components/modal/AuthModal'
import { GuestRegistrationModal } from '@/components/modal/GuestRegistrationModal'
import { Home } from '@/pages/Home'
import { ArticleDetail } from '@/pages/ArticleDetail'
import { Favourite } from '@/pages/Favourite'
import { Notifications } from '@/pages/Notifications'
import { ARTICLES, NOTIFICATIONS } from '@/data/mock-data'

export default function App() {
  // --- STATE MANAGEMENT ---

  // Navigation State
  const [view, setView] = useState<ViewState>('home')
  const [selectedCategory, setSelectedCategory] = useState<Category>('すべて')
  const [activeArticle, setActiveArticle] = useState<Article | null>(null)

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  // Interaction State (Likes, Comments, Sessions)
  const [likes, setLikes] = useState<Record<number, boolean>>({})
  const [comments, setComments] = useState<Record<number, string>>({})
  const [registeredSessions, setRegisteredSessions] = useState<
    Record<number, boolean>
  >({})

  // Guest Registration State
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [pendingSessionId, setPendingSessionId] = useState<number | null>(null)

  // --- DERIVED STATE ---

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'すべて') return ARTICLES
    return ARTICLES.filter((a) => a.category === selectedCategory)
  }, [selectedCategory])

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length

  // --- HANDLERS ---

  // Navigation
  const goToDetail = (article: Article) => {
    setActiveArticle(article)
    setView('detail')
    window.scrollTo(0, 0)
  }

  const goToHome = () => {
    setView('home')
    window.scrollTo(0, 0)
  }

  // Auth Logic
  const handleAuthComplete = (user: UserProfile) => {
    setCurrentUser(user)
    setShowAuthModal(false)
    toast.success(
      authMode === 'login'
        ? `${user.name}さん、ようこそ戻ってきました！`
        : `ようこそ、${user.name}さん！`,
    )
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setView('home')
  }

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  // Interaction Logic
  const handleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleComment = (id: number, text: string) => {
    setComments((prev) => ({ ...prev, [id]: text }))
  }

  // Session Registration Logic
  const handleRegisterSessionRequest = (id: number) => {
    if (currentUser) {
      // Logged in user
      setRegisteredSessions((prev) => ({ ...prev, [id]: true }))
      toast.success(
        `${currentUser.name}さん、登録が完了しました！リンクは ${currentUser.email} に送信されます。`,
      )
    } else {
      // Guest
      setPendingSessionId(id)
      setIsGuestModalOpen(true)
    }
  }

  const handleGuestSubmit = (formData: any) => {
    if (pendingSessionId) {
      setRegisteredSessions((prev) => ({ ...prev, [pendingSessionId]: true }))
      toast.success(
        `登録完了！招待状の情報が ${formData.email} に送信されました。`,
      )
      setIsGuestModalOpen(false)
      setPendingSessionId(null)
    }
  }

  // --- RENDER HELPERS ---

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <Home
            currentUser={currentUser}
            filteredArticles={filteredArticles}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            goToDetail={goToDetail}
            likes={likes}
          />
        )
      case 'detail':
        return (
          <ArticleDetail
            article={activeArticle}
            currentUser={currentUser}
            onBack={goToHome}
            likes={likes}
            onLike={handleLike}
            comments={comments}
            onComment={handleComment}
            registeredSessions={registeredSessions}
            onRegisterSession={handleRegisterSessionRequest}
          />
        )
      case 'profile':
        return (
          <Favourite
            currentUser={currentUser}
            articles={ARTICLES}
            likes={likes}
            comments={comments}
            registeredSessions={registeredSessions}
            goToDetail={goToDetail}
            onLoginClick={() => openAuthModal('login')}
            goHome={goToHome}
          />
        )
      case 'notifications':
        return <Notifications notifications={NOTIFICATIONS} />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* 1. DESKTOP SIDEBAR */}
      <Sidebar
        view={view}
        setView={setView}
        currentUser={currentUser}
        unreadCount={unreadCount}
        onLogout={handleLogout}
        onLoginClick={() => openAuthModal('login')}
      />

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex flex-1 flex-col transition-all duration-300 md:ml-64">
        {/* MOBILE HEADER */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={goToHome}>
              <div className="rounded-lg bg-blue-600 p-1.5 text-white">
                <Users size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800">
                先生リンク
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentUser ? (
                <button
                  onClick={() => setView('notifications')}
                  className="relative cursor-pointer rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
                  <Bell
                    size={20}
                    className={
                      view === 'notifications'
                        ? 'fill-current text-blue-600'
                        : ''
                    }
                  />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
                  )}
                </button>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => openAuthModal('login')}>
                  ログイン
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-8">
          {renderContent()}
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      <div className="safe-area-bottom fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-slate-200 bg-white px-6 py-2 md:hidden">
        <div
          onClick={goToHome}
          className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-colors ${
            view === 'home' || view === 'detail'
              ? 'text-blue-600'
              : 'text-slate-400'
          }`}>
          <HomeIcon size={24} strokeWidth={view === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">ホーム</span>
        </div>

        <div
          onClick={() =>
            currentUser ? setView('profile') : openAuthModal('login')
          }
          className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-colors ${
            view === 'profile' ? 'text-blue-600' : 'text-slate-400'
          }`}>
          <Heart
            size={24}
            className={view === 'profile' ? 'fill-current' : ''}
          />
          <span className="text-[10px] font-medium">お気に入り</span>
        </div>
      </div>

      {/* 4. GLOBAL MODALS */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        onAuthComplete={handleAuthComplete}
      />

      <GuestRegistrationModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onSubmit={handleGuestSubmit}
        onSwitchToLogin={() => {
          setIsGuestModalOpen(false)
          openAuthModal('login')
        }}
      />
    </div>
  )
}
