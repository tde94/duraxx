import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedAnnouncement() {
  console.log('Seeding initial announcement...')

  const announcement = {
    title: 'Happy Birthday Mustafa Cansu',
    description: 'Alles Gute zum Geburtstag Mustafa Cansu iyiki varsın seni seviyoruz ❤️',
    is_active: true
  }

  const { error } = await supabase
    .from('announcements')
    .insert([announcement])

  if (error) {
    console.error('Error seeding announcement:', error)
  } else {
    console.log('Successfully seeded announcement.')
  }
}

seedAnnouncement()
