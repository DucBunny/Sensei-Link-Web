'use client'

import { useCallback, useState } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { DashboardCard } from '@/components/dashboard-card'
import { DashboardHeader } from '@/components/dashboard-header'
import { QuickActions } from '@/components/quick-actions'
import { RecentActivity } from '@/components/recent-activity'
import { RevenueChart } from '@/components/revenue-chart'
import { SystemStatus } from '@/components/system-status'
import { UsersTable } from '@/components/users-table'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function AdminDashboard() {
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }, [])

  const handleExport = useCallback(() => {
    console.log('Exporting data…')
  }, [])

  const handleAddUser = useCallback(() => {
    console.log('Open add user modal…')
  }, [])

  const stats = [
    {
      title: 'Total Users',
      value: '1.2K',
      change: '+8%',
      changeType: 'positive' as const,
      icon: () => <></>,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Sessions',
      value: '830',
      change: '-5%',
      changeType: 'negative' as const,
      icon: () => <></>,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
  ]

  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <DashboardHeader
          searchQuery={search}
          onSearchChange={handleSearchChange}
          onRefresh={handleRefresh}
          onExport={handleExport}
          isRefreshing={refreshing}
        />

        <main className="space-y-6 p-6">
          <QuickActions onAddUser={handleAddUser} onExport={handleExport} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, idx) => (
              <DashboardCard key={idx} stat={stat} index={idx} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RevenueChart />
            <SystemStatus />
          </div>

          <RecentActivity />

          <UsersTable onAddUser={handleAddUser} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
