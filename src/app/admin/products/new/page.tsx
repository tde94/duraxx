import { supabaseAdmin } from '@/lib/supabase/admin'
import { addProduct } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function AddProductPage() {
  // Fetch categories for the select dropdown using admin client
  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('id, title')
    .order('display_order', { ascending: true })

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500">Create a new product in the catalog.</p>
        </div>
      </div>

      <form action={addProduct} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Varta 10"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="article_number" className="block text-sm font-medium text-gray-700">Article Number *</label>
            <input
              type="text"
              id="article_number"
              name="article_number"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. ART-1000"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category *</label>
            <select
              id="category_id"
              name="category_id"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              required
              min="0"
              defaultValue="1"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="image_file" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              id="image_file"
              name="image_file"
              accept="image/*"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to add image later.</p>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Product description..."
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active (Visible on website)
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
          <Link
            href="/admin/products"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  )
}
