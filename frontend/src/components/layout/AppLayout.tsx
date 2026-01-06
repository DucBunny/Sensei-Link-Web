import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

interface BreadcrumbItemData {
  label: string
  href?: string
}

interface AppLayoutProps {
  children: React.ReactNode
  searchQuery?: string
  onSearchChange?: (value: string) => void
  onCreateArticle?: () => void
  breadcrumbs?: Array<BreadcrumbItemData>
}

export function AppLayout({
  children,
  searchQuery = '',
  onSearchChange = () => { },
  onCreateArticle,
  breadcrumbs,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onCreateArticle={onCreateArticle}
          breadcrumbs={breadcrumbs}
        />
        <div className="flex flex-1 flex-col">
          <div className="bg-muted/50 flex-1 p-4 md:p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
