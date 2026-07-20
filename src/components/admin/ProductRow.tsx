'use client'

import { useState, useEffect } from 'react'
import { Edit, Trash2, X } from 'lucide-react'
import { deleteProduct, updateProduct } from '@/app/admin/products/actions'
import { useSearchParams } from 'next/navigation'

export default function ProductRow({ product, categories }: { product: any, categories: any[] }) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('edit') === product.id) {
      setIsEditOpen(true)
    }
  }, [searchParams, product.id])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true)
      try {
        await deleteProduct(product.id)
      } catch (error) {
        alert('Failed to delete product.')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateProduct(product.id, formData)
      setIsEditOpen(false)
    } catch (error) {
      alert('Failed to update product.')
    }
  }

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="flex items-center gap-4 px-6 py-4">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white p-1">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="h-full w-full object-contain" />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
          </div>
          <div className="font-medium text-gray-900">{product.name}</div>
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {categories.find(c => c.id === product.category_id)?.title || 'Unknown'}
          </span>
        </td>
        <td className="px-6 py-4">{product.article_number}</td>
        <td className="px-6 py-4 max-w-[200px] truncate text-gray-500" title={product.description || ''}>
          {product.description || '-'}
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {product.stock ?? 0}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {product.is_active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td className="px-6 py-4 text-right">
          <button 
            onClick={() => setIsEditOpen(true)}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-md p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsEditOpen(false)} 
              className="absolute right-4 top-4 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900">Edit Product</h2>
            
            <form action={handleUpdate} className="space-y-6 text-left">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor={`name-${product.id}`} className="block text-sm font-medium text-gray-700">Product Name *</label>
                  <input
                    type="text"
                    id={`name-${product.id}`}
                    name="name"
                    defaultValue={product.name}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`article-${product.id}`} className="block text-sm font-medium text-gray-700">Article Number *</label>
                  <input
                    type="text"
                    id={`article-${product.id}`}
                    name="article_number"
                    defaultValue={product.article_number}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`category-${product.id}`} className="block text-sm font-medium text-gray-700">Category *</label>
                  <select
                    id={`category-${product.id}`}
                    name="category_id"
                    defaultValue={product.category_id}
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
                  <label htmlFor={`stock-${product.id}`} className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                  <input
                    type="number"
                    id={`stock-${product.id}`}
                    name="stock"
                    required
                    min="0"
                    defaultValue={product.stock || 0}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor={`image-${product.id}`} className="block text-sm font-medium text-gray-700">Upload New Image</label>
                  <input
                    type="file"
                    id={`image-${product.id}`}
                    name="image_file"
                    accept="image/*"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor={`desc-${product.id}`} className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id={`desc-${product.id}`}
                  name="description"
                  defaultValue={product.description || ''}
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`active-${product.id}`}
                    name="is_active"
                    defaultChecked={product.is_active}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`active-${product.id}`} className="text-sm font-medium text-gray-700">
                    Active (Visible on website)
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-6 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
