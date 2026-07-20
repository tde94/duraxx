'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

type Announcement = {
  id: string
  title: string
  description: string | null
  link: string | null
  is_active: boolean
  display_order: number
}

export default function AnnouncementRow({ announcement }: { announcement: Announcement }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Sind Sie sicher, dass Sie diese Ankündigung löschen möchten?')) return
    
    setIsDeleting(true)
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', announcement.id)

    if (!error) {
      router.refresh()
    }
    setIsDeleting(false)
  }

  const handleToggleStatus = async () => {
    const { error } = await supabase
      .from('announcements')
      .update({ is_active: !announcement.is_active })
      .eq('id', announcement.id)
      
    if (!error) {
      router.refresh()
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">{announcement.title}</div>
        {announcement.link && (
          <div className="text-xs text-blue-600 truncate max-w-[200px] mt-1">
            {announcement.link}
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-gray-500">
        <div className="line-clamp-2 max-w-xs">{announcement.description}</div>
      </td>
      <td className="px-6 py-4 text-gray-500">
        {announcement.display_order}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={handleToggleStatus}
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            announcement.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {announcement.is_active ? 'Aktiv' : 'Inaktiv'}
        </button>
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-900 disabled:opacity-50 ml-4"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}
