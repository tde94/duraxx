'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a standard client using anon key since we have anon insert permissions
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

export async function trackPageView(path: string) {
  if (!supabase) return
  
  // Track the visit silently
  try {
    // Only track public frontend pages (ignore admin routes)
    if (!path.startsWith('/admin')) {
      await supabase.from('site_visits').insert([{ path }])
    }
  } catch (error) {
    // Fail silently so it doesn't break the user experience
    console.error('Failed to track page view:', error)
  }
}
