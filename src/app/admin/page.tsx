import { Package, MessageSquare, Megaphone, Activity, Clock } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Dashboard | Duraxx',
}

export default async function AdminDashboard() {
  const [
    { count: productsCount },
    { count: messagesCount },
    { count: announcementsCount },
    { count: siteVisitsCount },
    { data: recentProducts }
  ] = await Promise.all([
    supabaseAdmin.from('products').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabaseAdmin.from('announcements').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabaseAdmin.from('site_visits').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('products')
      .select('id, name, created_at, categories(title)')
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  const stats = [
    { name: 'Alle Produkte', value: productsCount || 0, icon: Package, change: 'Im Katalog', changeType: 'neutral' },
    { name: 'Besucher', value: siteVisitsCount || 0, icon: Activity, change: 'Gesamtaufrufe', changeType: 'neutral' },
    { name: 'Ungelesene', value: messagesCount || 0, icon: MessageSquare, change: 'Antwort nötig', changeType: 'positive' },
    { name: 'Aktive News', value: announcementsCount || 0, icon: Megaphone, change: 'Laufend', changeType: 'positive' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Übersicht</h1>
        <p className="text-gray-500">Willkommen im Duraxx Admin-Panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-50 p-3">
                <stat.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Zuletzt hinzugefügt</h2>
            <Link href="/admin/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">Alle ansehen</Link>
          </div>
          
          <div className="space-y-4">
            {recentProducts && recentProducts.length > 0 ? (
              recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      {/* @ts-ignore */}
                      <p className="text-xs text-gray-500">{product.categories?.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(product.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-500">Noch keine Produkte vorhanden</p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Schnellaktionen</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Link href="/admin/products/new" className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 p-4 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              <Package className="h-5 w-5" />
              Produkt hinzu.
            </Link>
            <Link href="/admin/messages" className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <MessageSquare className="h-5 w-5" />
              Nachrichten
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
