import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditMediaForm from './EditMediaForm'

export default async function EditMediaPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: media } = await supabase
    .from('media')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!media) {
    notFound()
  }

  return <EditMediaForm initialData={media} />
}
