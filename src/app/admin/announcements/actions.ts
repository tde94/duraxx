'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function createAnnouncement(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const link = formData.get('link') as string
  const is_active = formData.get('is_active') === 'on'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (!title) {
    return { error: 'Titel ist erforderlich' }
  }

  const { error } = await supabaseAdmin
    .from('announcements')
    .insert([{
      title,
      description: description || null,
      link: link || null,
      is_active,
      display_order
    }])

  if (error) {
    return { error: error.message }
  }

  redirect('/admin/announcements')
}
