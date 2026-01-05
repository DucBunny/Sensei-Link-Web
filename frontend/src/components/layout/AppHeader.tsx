import { memo } from 'react'
import { motion } from 'framer-motion'
import { Bell, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'

interface AppHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onCreateArticle?: () => void
}

export const AppHeader = memo(
  ({ searchQuery, onSearchChange, onCreateArticle }: AppHeaderProps) => {
    return (
      <header className="bg-background/95 sticky top-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="ml-auto flex items-center gap-2 px-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2">
            {/* Search Input - Hide on Mobile */}
            <div className="relative hidden md:block">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="記事を検索..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 pl-10"
              />
            </div>

            {/* Create Article Button */}
            {onCreateArticle && (
              <Button
                onClick={onCreateArticle}
                size="sm"
                className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                記事を作成
              </Button>
            )}

            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </header>
    )
  },
)

AppHeader.displayName = 'AppHeader'
