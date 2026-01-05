import { Bell, Calendar } from 'lucide-react'
import type { NotificationItem } from '@/types'
import { Button } from '@/components/ui/button'

interface NotificationsProps {
  notifications: Array<NotificationItem>
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  return (
    <div className="animate-in fade-in mx-auto max-w-5xl pb-20 duration-500">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-800">
        <Bell className="text-blue-600" />
        通知
      </h1>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex gap-4 rounded-xl border p-4 ${
              notif.read
                ? 'border-slate-200 bg-white'
                : 'border-blue-100 bg-blue-50'
            }`}>
            <div
              className={`mt-1 size-9 rounded-full p-2 ${
                notif.type === 'session'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-slate-100 text-slate-600'
              }`}>
              {notif.type === 'session' ? (
                <Calendar size={20} />
              ) : (
                <Bell size={20} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3
                  className={`text-sm font-semibold md:text-base ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                  {notif.title}
                </h3>
                <span className="ml-2 text-xs whitespace-nowrap text-slate-400">
                  {notif.time}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {notif.message}
              </p>
              {!notif.read && (
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    既読にする
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
