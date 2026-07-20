'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

type Partner = {
  id: string
  name: string
  description_en: string | null
  description_de: string | null
  is_active: boolean
  display_order: number
}

export default function PartnerRow({ partner }: { partner: Partner }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Partner löschen möchten?')) return
    
    setIsDeleting(true)
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', partner.id)

    if (!error) {
      router.refresh()
    }
    setIsDeleting(false)
  }

  const handleToggleStatus = async () => {
    const { error } = await supabase
      .from('partners')
      .update({ is_active: !partner.is_active })
      .eq('id', partner.id)
      
    if (!error) {
      router.refresh()
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">{partner.name}</div>
      </td>
      <td className="px-6 py-4 text-gray-500">
        <div className="line-clamp-2 max-w-xs">{partner.description_en}</div>
      </td>
      <td className="px-6 py-4 text-gray-500">
        <div className="line-clamp-2 max-w-xs">{partner.description_de}</div>
      </td>
      <td className="px-6 py-4">
        {partner.image_url ? (
          <img src={partner.image_url} alt={partner.name} className="h-8 w-auto" />
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </td>
      <td className="px-6 py-4 text-gray-500">
        {partner.display_order}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={handleToggleStatus}
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            partner.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {partner.is_active ? 'Aktiv' : 'Inaktiv'}
        </button>
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-3">
          <Link
            href={`/admin/partners/${partner.id}/edit`}
            className="text-blue-600 hover:text-blue-900"
          >
            Bearbeiten
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
