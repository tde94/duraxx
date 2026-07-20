'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Trash2, Video, Image as ImageIcon, FileText } from 'lucide-react'
import { deleteMedia } from '@/app/admin/actions/media'

export default function MediaRow({ media }: { media: any }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Bu medyayı silmek istediğinize emin misiniz?')) return
    
    setIsDeleting(true)
    try {
      await deleteMedia(media.id)
      router.refresh()
    } catch (error) {
      alert('Silme işlemi başarısız oldu')
      setIsDeleting(false)
    }
  }

  const getIcon = () => {
    switch (media.type) {
      case 'video': return <Video className="w-5 h-5 text-blue-500" />
      case 'image': return <ImageIcon className="w-5 h-5 text-green-500" />
      default: return <FileText className="w-5 h-5 text-slate-500" />
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
            {media.file_url && media.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.file_url} alt="" className="w-full h-full object-cover rounded-lg" />
            ) : media.thumbnail_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.thumbnail_url} alt="" className="w-full h-full object-cover rounded-lg" />
            ) : (
              getIcon()
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{media.title}</div>
            <div className="text-xs text-gray-500">{media.category}</div>
          </div>
        </div>
      </td>
      <td className="p-4 align-middle">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
          {media.type}
        </span>
      </td>
      <td className="p-4 align-middle">
        {media.external_url ? (
          <a href={media.external_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm truncate max-w-[150px] inline-block">
            {media.external_url}
          </a>
        ) : media.file_url ? (
          <a href={media.file_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm truncate max-w-[150px] inline-block">
            Dosya Yüklü
          </a>
        ) : (
          <span className="text-slate-400 text-sm">-</span>
        )}
      </td>
      <td className="p-4 align-middle">
        {media.is_active ? (
          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Aktif
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            Pasif
          </span>
        )}
      </td>
      <td className="p-4 align-middle text-right">
        <div className="flex justify-end gap-2">
          <Link
            href={`/admin/media/${media.id}/edit`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
