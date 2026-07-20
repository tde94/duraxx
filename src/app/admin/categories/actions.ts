'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function uploadImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from('category-images')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false
    })

  if (error) throw new Error(`Resim yüklenirken hata oluştu: ${error.message}`)

  const { data } = supabaseAdmin.storage
    .from('category-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function addCategory(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const display_order = parseInt(formData.get('display_order') as string || '0', 10)
  
  const image_file = formData.get('image_file') as File | null
  const image_url = await uploadImage(image_file)

  if (!title || !slug) {
    throw new Error('İsim ve slug zorunludur.')
  }

  const { error } = await supabaseAdmin
    .from('categories')
    .insert([{ title, slug, display_order, image_url }])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  const { error } = await supabaseAdmin.from('categories').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const display_order = parseInt(formData.get('display_order') as string || '0', 10)

  const updateData: any = { title, slug, display_order }

  const image_file = formData.get('image_file') as File | null
  const new_image_url = await uploadImage(image_file)
  
  if (new_image_url) {
    updateData.image_url = new_image_url
  }

  const { error } = await supabaseAdmin
    .from('categories')
    .update(updateData)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
}
