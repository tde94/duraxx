import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import MediaRow from '@/components/admin/MediaRow'

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  const supabase = createClient()
  
  const { data: mediaItems } = await supabase
    .from('media')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Mediathek</h1>
          <p className="mt-1 text-sm text-gray-500">
            Verwalten Sie Ihre Bilder, Videos und Dokumente.
          </p>
        </div>
        <Link
          href="/admin/media/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Neue Medien hinzufügen
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-4 w-[40%]">Titel & Kategorie</th>
                <th scope="col" className="px-4 py-4 w-[15%]">Typ</th>
                <th scope="col" className="px-4 py-4 w-[25%]">Quelle</th>
                <th scope="col" className="px-4 py-4 w-[10%]">Status</th>
                <th scope="col" className="px-4 py-4 text-right w-[10%]">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {mediaItems?.map((media) => (
                <MediaRow key={media.id} media={media} />
              ))}
              {!mediaItems?.length && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Noch keine Medien vorhanden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
