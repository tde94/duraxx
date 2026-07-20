import { supabaseAdmin } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import EditPartnerForm from './EditPartnerForm'

export const dynamic = 'force-dynamic'

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const { data: partner, error } = await supabaseAdmin
    .from('partners')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !partner) {
    notFound()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Partner bearbeiten</h1>
      </div>
      
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <EditPartnerForm partner={partner} />
      </div>
    </div>
  )
}
