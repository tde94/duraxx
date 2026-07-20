import Sidebar from '@/components/admin/Sidebar'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Duraxx Admin',
  description: 'Duraxx Admin Panel',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Duraxx Admin',
  },
}

export const viewport: Viewport = {
  themeColor: '#1E293B',
}
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 relative">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 pt-20 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  )
}
