import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

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
        <div className="flex flex-1 flex-col">
          <div className="bg-muted/50 flex-1 rounded-xl p-6 md:p-8">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
