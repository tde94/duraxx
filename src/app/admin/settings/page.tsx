'use client'

import { useState } from 'react'
import { changePassword } from '@/app/admin/actions/auth'

export default function SettingsPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    
    const result = await changePassword(formData)
    
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess('Passwort erfolgreich aktualisiert!')
      const form = document.getElementById('password-form') as HTMLFormElement
      form.reset()
    }
    
    setIsLoading(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Einstellungen</h1>
        <p className="text-sm text-gray-500">Verwalten Sie Ihre Admin-Einstellungen.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Passwort ändern</h2>
        
        <form id="password-form" action={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          
          {success && (
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Aktuelles Passwort
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Neues Passwort
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Wird aktualisiert...' : 'Passwort aktualisieren'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
