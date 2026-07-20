'use client'

import { useState } from 'react'
import Link from 'next/link'
import { updatePartner } from '../../../actions/partners'

type Partner = {
  id: string
  name: string
  description_en: string | null
  description_de: string | null
  is_active: boolean
  display_order: number
}

export default function EditPartnerForm({ partner }: { partner: Partner }) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string>('')

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    const result = await updatePartner(partner.id, formData)
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={partner.name}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description_en" className="block text-sm font-medium text-gray-700">
            Beschreibung (Englisch)
          </label>
          <textarea
            name="description_en"
            id="description_en"
            rows={3}
            defaultValue={partner.description_en || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description_de" className="block text-sm font-medium text-gray-700">
            Beschreibung (Deutsch)
          </label>
          <textarea
            name="description_de"
            id="description_de"
            rows={3}
            defaultValue={partner.description_de || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="display_order" className="block text-sm font-medium text-gray-700">
              Reihenfolge
            </label>
            <input
              type="number"
              name="display_order"
              id="display_order"
              defaultValue={partner.display_order}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Neues Logo hochladen
              </label>
              {partner.image_url && (
                <div className="mb-3">
                  <span className="text-xs text-gray-500 block mb-1">Aktuelles Logo:</span>
                  <img src={partner.image_url} alt="Logo" className="h-10 object-contain" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <label htmlFor="image_file" className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
                  Datei auswählen
                </label>
                <span className="text-sm text-gray-500 truncate max-w-xs">
                  {fileName || 'Keine Datei ausgewählt'}
                </span>
                <input
                  type="file"
                  name="image_file"
                  id="image_file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                />
              </div>
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                name="is_active"
                id="is_active"
                defaultChecked={partner.is_active}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                Aktiv
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Link
          href="/admin/partners"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Abbrechen
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Wird gespeichert...' : 'Änderungen speichern'}
        </button>
      </div>
    </form>
  )
}
