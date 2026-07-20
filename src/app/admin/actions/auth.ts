'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  if (!password) {
    return { error: 'Passwort darf nicht leer sein' }
  }

  // Fetch the single password from DB
  const { data, error } = await supabaseAdmin
    .from('admin_auth')
    .select('password')
    .eq('id', 1)
    .single()

  if (error || !data) {
    return { error: 'Datenbank nicht erreichbar oder Passwort nicht definiert.' }
  }

  if (data.password === password) {
    cookies().set('admin_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
      // maxAge kaldırıldı: Tarayıcı kapanınca şifre tekrar sorulacak (Session Cookie)
    })
    redirect('/admin')
  } else {
    return { error: 'Falsches Passwort' }
  }
}

export async function logout() {
  cookies().delete('admin_token')
  redirect('/')
}

export async function changePassword(formData: FormData) {
  const oldPassword = formData.get('oldPassword') as string
  const newPassword = formData.get('newPassword') as string
  
  if (!oldPassword || !newPassword) {
    return { error: 'Bitte füllen Sie alle Felder aus.' }
  }

  const { data, error } = await supabaseAdmin
    .from('admin_auth')
    .select('password')
    .eq('id', 1)
    .single()

  if (error || !data) {
    return { error: 'Datenbankfehler.' }
  }

  if (data.password !== oldPassword) {
    return { error: 'Sie haben Ihr aktuelles Passwort falsch eingegeben.' }
  }

  const { error: updateError } = await supabaseAdmin
    .from('admin_auth')
    .update({ password: newPassword })
    .eq('id', 1)

  if (updateError) {
    return { error: 'Ein Fehler ist beim Aktualisieren des Passworts aufgetreten.' }
  }

  return { success: true }
}
