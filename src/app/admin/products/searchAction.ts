'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'

export async function searchProducts(query: string, categoryId?: string) {
  let dbQuery = supabaseAdmin
    .from('products')
    .select('id, name, article_number, image_url')
    .order('created_at', { ascending: false })
    .limit(8)
  
  if (categoryId) {
    dbQuery = dbQuery.eq('category_id', categoryId)
  }
  
  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,article_number.ilike.%${query}%`)
  }
  
  const { data } = await dbQuery
  return data || []
}
