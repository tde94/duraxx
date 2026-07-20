import { supabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import CategoryRow from '@/components/admin/CategoryRow'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kategorien</h1>
          <p className="text-sm text-gray-500">Verwalten Sie Ihre Produktkategorien.</p>
        </div>
        <Link 
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Kategorie hinzu.
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {(!categories || categories.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Keine Kategorien gefunden</h3>
            <p className="mt-1 text-sm text-gray-500">Erstellen Sie Ihre erste Kategorie.</p>
            <Link 
              href="/admin/categories/new"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Kategorie hinzu.
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Kategorie</th>
                  <th scope="col" className="px-6 py-4 font-medium">Slug</th>
                  <th scope="col" className="px-6 py-4 font-medium">Reihenfolge</th>
                  <th scope="col" className="px-6 py-4 font-medium text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <CategoryRow key={category.id} category={category} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
