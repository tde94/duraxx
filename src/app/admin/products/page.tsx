import { supabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import ProductRow from '@/components/admin/ProductRow'
import LiveProductSearch from '@/components/admin/LiveProductSearch'
import ExportExcelButton from '@/components/admin/ExportExcelButton'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryId = searchParams.category as string | undefined
  const searchQuery = searchParams.q as string | undefined

  // Kategori butonları için tüm kategorileri çek
  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('id, title')
    .order('display_order', { ascending: true })

  // Ürünleri filtreye göre çek
  let query = supabaseAdmin
    .from('products')
    .select(`
      id,
      category_id,
      name,
      article_number,
      description,
      stock,
      image_url,
      is_active,
      categories ( title )
    `)
    .order('created_at', { ascending: false })

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,article_number.ilike.%${searchQuery}%`)
  }

  const { data: products, error } = await query

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Produkte</h1>
          <p className="text-sm text-gray-500">Verwalten Sie Ihren Produktkatalog.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <LiveProductSearch categoryId={categoryId} />
          
          <ExportExcelButton products={products || []} categories={categories || []} />

          <Link
            href="/admin/products/new"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Neues Produkt
          </Link>
        </div>
      </div>

      {/* Kategori Filtre Butonları */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Link
          href="/admin/products"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${!categoryId
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
        >
          Alle Produkte
        </Link>
        {categories?.map((cat) => (
          <Link
            key={cat.id}
            href={`/admin/products?category=${cat.id}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${categoryId === cat.id
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {error ? (
          <div className="p-6 text-center text-red-500">
            Fehler beim Laden: {error.message}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Produkt</th>
                  <th scope="col" className="px-6 py-4 font-medium">Kategorie</th>
                  <th scope="col" className="px-6 py-4 font-medium">Artikel-Nr.</th>
                  <th scope="col" className="px-6 py-4 font-medium">Beschreibung</th>
                  <th scope="col" className="px-6 py-4 font-medium">Lager</th>
                  <th scope="col" className="px-6 py-4 font-medium">Status</th>
                  <th scope="col" className="px-6 py-4 font-medium text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <ProductRow 
                      key={product.id} 
                      product={product} 
                      categories={categories || []} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Keine Produkte in dieser Kategorie gefunden.
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
