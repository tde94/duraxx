import { supabaseAdmin } from '@/lib/supabase/admin'
import MessageRow from '@/components/admin/MessageRow'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  const { data: messages, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Nachrichten</h1>
          <p className="text-sm text-gray-500">Kontaktformulare einsehen und verwalten.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {error ? (
          <div className="p-6 text-center text-red-500">
            Error loading messages: {error.message}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Absender</th>
                  <th scope="col" className="px-6 py-4 font-medium">Betreff</th>
                  <th scope="col" className="px-6 py-4 font-medium">Datum</th>
                  <th scope="col" className="px-6 py-4 font-medium text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {messages && messages.length > 0 ? (
                  messages.map((message) => (
                    <MessageRow 
                      key={message.id} 
                      message={message} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      Keine Nachrichten gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
