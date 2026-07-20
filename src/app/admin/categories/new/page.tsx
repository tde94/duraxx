import { addCategory } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AddCategoryPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Category</h1>
          <p className="text-sm text-gray-500">Create a new category for products.</p>
        </div>
      </div>

      <form action={addCategory} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Category Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Batteries"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug *</label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. batteries"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="display_order" className="block text-sm font-medium text-gray-700">Display Order</label>
            <input
              type="number"
              id="display_order"
              name="display_order"
              defaultValue="0"
              min="0"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="image_file" className="block text-sm font-medium text-gray-700">Category Image</label>
            <input
              type="file"
              id="image_file"
              name="image_file"
              accept="image/*"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to add image later.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
          <Link
            href="/admin/categories"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  )
}
