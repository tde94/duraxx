'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function markMessageAsRead(id: string) {
  const { error } = await supabaseAdmin
    .from('messages')
    .update({ is_read: true })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/messages')
  revalidatePath('/admin') // refresh dashboard counters too
}

export async function deleteMessage(id: string) {
  const { error } = await supabaseAdmin
    .from('messages')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/messages')
  revalidatePath('/admin')
}
