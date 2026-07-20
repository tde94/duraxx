'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload, Link as LinkIcon } from 'lucide-react'
import { addMedia } from '@/app/admin/actions/media'

export default function NewMediaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [sourceType, setSourceType] = useState<'upload' | 'url'>('upload')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB sınırını aşamaz.')
        e.target.value = ''
        return
      }
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      if (sourceType === 'upload') {
        formData.delete('external_url') // Ensure external URL is not sent if upload is selected
      } else {
        formData.delete('file') // Ensure file is not sent if URL is selected
      }
      
      await addMedia(formData)
    } catch (error: any) {
      alert(error.message || 'Ein Fehler ist aufgetreten')
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/media" className="text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Neues Medium</h1>
          <p className="mt-1 text-sm text-gray-500">Fügen Sie ein neues Bild oder Video zur Mediathek hinzu.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-900">
              Titel
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="z.B. Produktvideo 2026"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-900">
              Kategorie
            </label>
            <select
              name="category"
              id="category"
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white"
            >
              <option value="Messe">Messe (Fuar)</option>
              <option value="Anleitung">Anleitung (Kılavuz)</option>
              <option value="Presse">Presse (Basın)</option>
              <option value="Allgemein">Allgemein (Genel)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-900">
            Beschreibung
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Optionale Beschreibung..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-900">
            Medientyp
          </label>
          <select
            name="type"
            id="type"
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white"
          >
            <option value="image">Bild (Resim)</option>
            <option value="video">Video</option>
            <option value="document">Dokument (Belge)</option>
          </select>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-900">Medienquelle</label>
          
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setSourceType('upload')}
              className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                sourceType === 'upload' 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Upload className="w-4 h-4" />
              Datei hochladen (Max 5MB)
            </button>
            <button
              type="button"
              onClick={() => setSourceType('url')}
              className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                sourceType === 'url' 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              YouTube / Externer Link
            </button>
          </div>

          {sourceType === 'upload' ? (
            <div className="space-y-4">
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*,video/*,application/pdf"
                required={sourceType === 'upload'}
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {previewUrl && (
                <div className="mt-4 rounded-lg border border-gray-200 p-2 w-fit bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Preview" className="h-32 object-contain rounded-md" />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="url"
                name="external_url"
                id="external_url"
                required={sourceType === 'url'}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-gray-100">
          <div className="space-y-2">
            <label htmlFor="display_order" className="block text-sm font-medium text-gray-900">
              Reihenfolge (Sıra)
            </label>
            <input
              type="number"
              name="display_order"
              id="display_order"
              defaultValue="0"
              className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center space-x-3 pt-8">
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-900">
              Aktiv (Auf Website anzeigen)
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
          <Link
            href="/admin/media"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Speichern...' : 'Speichern'}
          </button>
        </div>
      </form>
    </div>
  )
}
