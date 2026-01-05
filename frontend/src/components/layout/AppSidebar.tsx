import { memo, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  BookOpen,
  Heart,
  LogIn,
  LogOut,
  Moon,
  Sun,
  User,
  Users,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { clearCurrentUser, getCurrentUser } from '@/api'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const menuItems = [
  { title: 'ホーム', icon: BookOpen, href: '/', isPublic: true },
  { title: '保存した記事', icon: Heart, href: '/saved', isPublic: false },
  { title: 'セッション', icon: Users, href: '/sessions', isPublic: false },
]

export const AppSidebar = memo(() => {
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState(() => getCurrentUser())

  const logOut = () => {
    clearCurrentUser()
    setUser(null)
    window.location.reload()
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">センセイリンク</span>
                  <span className="truncate text-xs">教師コミュニティ</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ナビゲーション</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                if (!item.isPublic && !user) {
                  return null
                }
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link to={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun /> : <Moon />}
              <span>{theme === 'dark' ? 'ライトモード' : 'ダークモード'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {user ? (
                <a href="#profile">
                  <User />
                  <span>プロフィール</span>
                </a>
              ) : (
                <Link to="/login">
                  <LogIn />
                  <span>ログイン</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              hidden={!user}
              onClick={() => {
                logOut()
              }}
              className="cursor-pointer">
              <LogOut />
              <span>ログアウト</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
})
