'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null

  // Enforce 5MB limit
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Dosya boyutu 5MB sınırını aşamaz.')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from('media-files')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false
    })

  if (error) throw new Error(`Dosya yüklenirken hata oluştu: ${error.message}`)

  const { data } = supabaseAdmin.storage
    .from('media-files')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function addMedia(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const category = formData.get('category') as string
  const external_url = formData.get('external_url') as string
  const display_order = parseInt(formData.get('display_order') as string || '0', 10)
  const is_active = formData.get('is_active') === 'on'
  
  const file = formData.get('file') as File | null
  
  if (!title || !type || !category) {
    throw new Error('Başlık, tip ve kategori zorunludur.')
  }

  // Handle file upload if present
  let file_url = null
  if (file && file.size > 0) {
    file_url = await uploadFile(file)
  }

  // Validate that either a file or an external URL is provided
  if (!file_url && !external_url) {
    throw new Error('Lütfen ya bir dosya yükleyin ya da YouTube vb. bir dış bağlantı (URL) girin.')
  }

  const { error } = await supabaseAdmin
    .from('media')
    .insert([{ 
      title, 
      description, 
      type, 
      category, 
      file_url, 
      external_url,
      display_order,
      is_active
    }])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/media')
  redirect('/admin/media')
}

export async function updateMedia(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const category = formData.get('category') as string
  const external_url = formData.get('external_url') as string
  const display_order = parseInt(formData.get('display_order') as string || '0', 10)
  const is_active = formData.get('is_active') === 'on'
  
  const file = formData.get('file') as File | null

  if (!title || !type || !category) {
    throw new Error('Başlık, tip ve kategori zorunludur.')
  }

  const updateData: any = { 
    title, 
    description, 
    type, 
    category, 
    external_url,
    display_order,
    is_active
  }

  if (file && file.size > 0) {
    const file_url = await uploadFile(file)
    if (file_url) updateData.file_url = file_url
  }

  const { error } = await supabaseAdmin
    .from('media')
    .update(updateData)
    .eq('id', id)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/media')
  redirect('/admin/media')
}

export async function deleteMedia(id: string) {
  const { error } = await supabaseAdmin.from('media').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/media')
}
