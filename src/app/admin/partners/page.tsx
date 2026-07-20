import { supabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import PartnerRow from '@/components/admin/PartnerRow'

export const dynamic = 'force-dynamic'

export default async function AdminPartnersPage() {
  const { data: partners, error } = await supabaseAdmin
    .from('partners')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Partnerler</h1>
          <p className="text-sm text-gray-500">Verwalten Sie Ihre offiziellen Vertriebs- und Logistikpartner.</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Partner hinzu.
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {error ? (
          <div className="p-6 text-center text-red-500">
            Error loading partners: {error.message}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Name</th>
                  <th scope="col" className="px-6 py-4 font-medium">Beschreibung (EN)</th>
                  <th scope="col" className="px-6 py-4 font-medium">Beschreibung (DE)</th>
                  <th scope="col" className="px-6 py-4 font-medium">Reihenfolge</th>
                  <th scope="col" className="px-6 py-4 font-medium">Status</th>
                  <th scope="col" className="px-6 py-4 font-medium text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partners && partners.length > 0 ? (
                  partners.map((partner) => (
                    <PartnerRow key={partner.id} partner={partner} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Keine Partner gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
