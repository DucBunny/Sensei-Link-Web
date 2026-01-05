'use client'

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'

interface AppLayoutProps {
  children: React.ReactNode
  searchQuery?: string
  onSearchChange?: (value: string) => void
  onCreateArticle?: () => void
}

export function AppLayout({
  children,
  searchQuery = '',
  onSearchChange = () => {},
  onCreateArticle,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onCreateArticle={onCreateArticle}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:p-8">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

