'use client'

import { useState } from 'react'
import { Trash2, X, Check, MailOpen } from 'lucide-react'
import { markMessageAsRead, deleteMessage } from '@/app/admin/messages/actions'

export default function MessageRow({ message }: { message: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleOpen = async () => {
    setIsOpen(true)
    if (!message.is_read) {
      try {
        await markMessageAsRead(message.id)
      } catch (error) {
        console.error('Failed to mark as read', error)
      }
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation() // prevent opening modal
    if (confirm('Are you sure you want to delete this message?')) {
      setIsDeleting(true)
      try {
        await deleteMessage(message.id)
      } catch (error) {
        alert('Failed to delete message.')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  // Parse company and VAT ID if they exist in the message body
  let parsedCompany = '-'
  let parsedVatId = '-'
  let displayMessage = message.message

  if (displayMessage.startsWith('Company: ')) {
    const lines = displayMessage.split('\n')
    const companyLine = lines.find(l => l.startsWith('Company: '))
    const vatLine = lines.find(l => l.startsWith('VAT ID: '))
    
    if (companyLine) parsedCompany = companyLine.replace('Company: ', '').trim()
    if (vatLine) parsedVatId = vatLine.replace('VAT ID: ', '').trim()

    const msgIndex = displayMessage.indexOf('Message:\n')
    if (msgIndex !== -1) {
      displayMessage = displayMessage.substring(msgIndex + 'Message:\n'.length).trim()
    }
  }

  return (
    <>
      <tr 
        onClick={handleOpen}
        className={`cursor-pointer transition-colors hover:bg-gray-50 ${!message.is_read ? 'bg-blue-50/30' : ''}`}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-2 font-medium text-gray-900">
            {!message.is_read && <span className="h-2 w-2 rounded-full bg-blue-600"></span>}
            {message.name}
          </div>
        </td>
        <td className="px-6 py-4 text-gray-500">{message.subject}</td>
        <td className="px-6 py-4 text-gray-500">
          {new Date(message.created_at).toLocaleDateString('tr-TR', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
          })}
        </td>
        <td className="px-6 py-4 text-right">
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-md p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </td>
      </tr>

      {/* View Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl relative max-h-[90vh] overflow-y-auto text-left">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute right-4 top-4 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <MailOpen className="h-5 w-5 text-blue-600" />
              Message Details
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 border border-gray-100">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Sender</p>
                  <p className="font-medium text-gray-900">{message.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(message.created_at).toLocaleString('tr-TR')}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Email</p>
                  <a href={`mailto:${message.email}`} className="font-medium text-blue-600 hover:underline">
                    {message.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Phone</p>
                  <a href={`tel:${message.phone}`} className="font-medium text-blue-600 hover:underline">
                    {message.phone || '-'}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{parsedCompany}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">VAT ID</p>
                  <p className="font-medium text-gray-900">{parsedVatId}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 mb-1">Subject</p>
                <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {message.subject}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 mb-1">Message</p>
                <div className="font-medium text-gray-900 bg-gray-50 p-4 rounded-lg border border-gray-100 whitespace-pre-wrap min-h-[150px]">
                  {displayMessage}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
