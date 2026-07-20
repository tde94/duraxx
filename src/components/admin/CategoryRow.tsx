'use client'

import { useState } from 'react'
import { Edit, Trash2, X } from 'lucide-react'
import { deleteCategory, updateCategory } from '@/app/admin/categories/actions'

interface CategoryRowProps {
  category: {
    id: string
    title: string
    slug: string
    image_url: string | null
    display_order: number
  }
}

export default function CategoryRow({ category }: CategoryRowProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this category? This might affect products linked to it.')) {
      setIsDeleting(true)
      try {
        await deleteCategory(category.id)
      } catch (error) {
        alert('Failed to delete category.')
        setIsDeleting(false)
      }
    }
  }

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateCategory(category.id, formData)
      setIsEditOpen(false)
    } catch (error) {
      alert('Failed to update category.')
    }
  }

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="flex items-center gap-4 px-6 py-4">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white p-1">
            {category.image_url ? (
              <img src={category.image_url} alt={category.title} className="h-full w-full object-contain" />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
          </div>
          <div className="font-medium text-gray-900">{category.title}</div>
        </td>
        <td className="px-6 py-4">{category.slug}</td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {category.display_order}
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
            <h2 className="text-xl font-bold mb-6 text-gray-900">Edit Category</h2>
            
            <form action={handleUpdate} className="space-y-6 text-left">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor={`title-${category.id}`} className="block text-sm font-medium text-gray-700">Category Title *</label>
                  <input
                    type="text"
                    id={`title-${category.id}`}
                    name="title"
                    defaultValue={category.title}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`slug-${category.id}`} className="block text-sm font-medium text-gray-700">Slug *</label>
                  <input
                    type="text"
                    id={`slug-${category.id}`}
                    name="slug"
                    defaultValue={category.slug}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`display_order-${category.id}`} className="block text-sm font-medium text-gray-700">Display Order</label>
                  <input
                    type="number"
                    id={`display_order-${category.id}`}
                    name="display_order"
                    min="0"
                    defaultValue={category.display_order}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor={`image-${category.id}`} className="block text-sm font-medium text-gray-700">Upload New Image</label>
                  <input
                    type="file"
                    id={`image-${category.id}`}
                    name="image_file"
                    accept="image/*"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image.</p>
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
