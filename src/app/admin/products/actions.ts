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
    .from('product-images')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false
    })

  if (error) throw new Error(`Resim yüklenirken hata oluştu: ${error.message}`)

  const { data } = supabaseAdmin.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string
  const category_id = formData.get('category_id') as string
  const article_number = formData.get('article_number') as string
  const description = formData.get('description') as string
  const stock = parseInt(formData.get('stock') as string || '1', 10)
  const is_active = formData.get('is_active') === 'on'
  
  const image_file = formData.get('image_file') as File | null
  const image_url = await uploadImage(image_file)

  if (!name || !category_id || !article_number) {
    throw new Error('İsim, kategori ve artikel numarası zorunludur.')
  }

  const { error } = await supabaseAdmin
    .from('products')
    .insert([{ name, category_id, article_number, description, stock, image_url, is_active }])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function deleteProduct(id: string) {
  const { error } = await supabaseAdmin.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const category_id = formData.get('category_id') as string
  const article_number = formData.get('article_number') as string
  const description = formData.get('description') as string
  const stock = parseInt(formData.get('stock') as string || '1', 10)
  const is_active = formData.get('is_active') === 'on'

  const updateData: any = { name, category_id, article_number, description, stock, is_active }

  const image_file = formData.get('image_file') as File | null
  const new_image_url = await uploadImage(image_file)
  
  if (new_image_url) {
    updateData.image_url = new_image_url
  }

  const { error } = await supabaseAdmin
    .from('products')
    .update(updateData)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
}

