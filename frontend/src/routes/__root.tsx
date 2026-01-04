import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import { initializeData } from '@/api'

// Initialize data on app load
if (typeof window !== 'undefined') {
  initializeData()
}

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Outlet />
    </ThemeProvider>
  ),
})
