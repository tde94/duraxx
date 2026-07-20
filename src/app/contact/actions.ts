'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function submitContactForm(data: any) {
  const { firstName, lastName, companyName, vatId, email, phone, interest, message } = data

  const fullName = `${firstName} ${lastName}`
  const subject = `B2B Request (${interest}) - ${companyName}`
  
  const fullMessage = `
Company: ${companyName}
VAT ID: ${vatId ? vatId : 'N/A'}

Message:
${message}
  `.trim()

  const { error } = await supabaseAdmin
    .from('messages')
    .insert([{
      name: fullName,
      email,
      phone,
      subject,
      message: fullMessage
    }])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/messages')
  revalidatePath('/admin')
}
