'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function uploadImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from('partner-images')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false
    })

  if (error) throw new Error(`Fehler beim Hochladen des Bildes: ${error.message}`)

  const { data } = supabaseAdmin.storage
    .from('partner-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function createPartner(formData: FormData) {
  const name = formData.get('name') as string
  const description_en = formData.get('description_en') as string
  const description_de = formData.get('description_de') as string
  const is_active = formData.get('is_active') === 'on'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  const image_file = formData.get('image_file') as File | null
  const image_url = await uploadImage(image_file)

  if (!name) {
    return { error: 'Name ist erforderlich' }
  }

  const { error } = await supabaseAdmin
    .from('partners')
    .insert([{
      name,
      description_en: description_en || null,
      description_de: description_de || null,
      image_url: image_url || null,
      is_active,
      display_order
    }])

  if (error) {
    return { error: error.message }
  }

  redirect('/admin/partners')
}

export async function updatePartner(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const description_en = formData.get('description_en') as string
  const description_de = formData.get('description_de') as string
  const is_active = formData.get('is_active') === 'on'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (!name) {
    return { error: 'Name ist erforderlich' }
  }

  const updateData: any = {
    name,
    description_en: description_en || null,
    description_de: description_de || null,
    is_active,
    display_order
  }

  const image_file = formData.get('image_file') as File | null
  const new_image_url = await uploadImage(image_file)
  
  if (new_image_url) {
    updateData.image_url = new_image_url
  }

  const { error } = await supabaseAdmin
    .from('partners')
    .update(updateData)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  redirect('/admin/partners')
}
