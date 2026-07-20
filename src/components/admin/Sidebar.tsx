'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/admin/actions/auth'
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Megaphone,
  Settings,
  LogOut,
  ListTree,
  Users
} from 'lucide-react'

const navigation = [
  { name: 'Übersicht', href: '/admin', icon: LayoutDashboard },
  { name: 'Produkte', href: '/admin/products', icon: Package },
  { name: 'Kategorien', href: '/admin/categories', icon: ListTree },
  { name: 'Partnerler', href: '/admin/partners', icon: Users },
  { name: 'Mediathek', href: '/admin/media', icon: LayoutDashboard }, // Can use Video or Image icon, I will import Image/Video later, LayoutDashboard is fine for now
  { name: 'Ankündigungen', href: '/admin/announcements', icon: Megaphone },
  { name: 'Nachrichten', href: '/admin/messages', icon: MessageSquare },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-16 items-center px-6">
        <Link href="/admin" className="text-xl font-bold tracking-wider">
          DURAXX <span className="text-blue-500">ADMIN</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/admin'
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="border-t border-slate-700 p-4">
        <div className="space-y-1">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <Settings className="h-5 w-5" />
            Einstellungen
          </Link>
          <button
            onClick={async () => {
              await logout()
              window.location.href = '/' // Force hard redirect to clear router cache
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Abmelden
          </button>
        </div>
      </div>
    </div>
  )
}
