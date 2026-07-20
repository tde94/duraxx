import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const BUCKET_NAME = 'category-images'

const categoriesToSeed = [
  {
    slug: 'batteries',
    title: 'Batteries',
    imageFile: 'batteries.png',
    display_order: 1
  },
  {
    slug: 'ear-impression',
    title: 'Ear Impression',
    imageFile: 'ear-impression.jpg',
    display_order: 2
  },
  {
    slug: 'earmold-lab-equipment',
    title: 'Earmold Lab Equipment',
    imageFile: 'earmold-lab-equipment.jpg',
    display_order: 3
  },
  {
    slug: 'cleaning-customer-care',
    title: 'Cleaning & Customer Care',
    imageFile: 'cleaning-customer-care.png',
    display_order: 4
  },
  {
    slug: 'audiological-equipment-accessories',
    title: 'Audiological Equipment & Accessories',
    imageFile: 'audiological-equipment-accessories.png',
    display_order: 5
  }
]

async function run() {
  console.log('1. Checking bucket...')
  const { data: buckets } = await supabase.storage.listBuckets()
  if (!buckets?.find(b => b.name === BUCKET_NAME)) {
    console.log(`Bucket ${BUCKET_NAME} not found. Creating...`)
    await supabase.storage.createBucket(BUCKET_NAME, { public: true })
  } else {
    console.log(`Bucket ${BUCKET_NAME} already exists.`)
  }

  for (const cat of categoriesToSeed) {
    console.log(`\nProcessing category: ${cat.title}`)
    
    // Upload image
    const imagePath = path.join(__dirname, 'public', 'images', cat.imageFile)
    let imageUrl = null

    if (fs.existsSync(imagePath)) {
      console.log(`Uploading image ${cat.imageFile}...`)
      const fileBuffer = fs.readFileSync(imagePath)
      const fileName = `${Date.now()}-${cat.imageFile}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, fileBuffer, {
          contentType: cat.imageFile.endsWith('.png') ? 'image/png' : 'image/jpeg',
          upsert: true
        })
        
      if (uploadError) {
        console.error(`Failed to upload image for ${cat.slug}:`, uploadError)
        continue
      }
      
      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(uploadData.path)
        
      imageUrl = publicUrlData.publicUrl
      console.log(`Image uploaded: ${imageUrl}`)
    } else {
      console.warn(`Local image not found: ${imagePath}`)
    }

    // Check if category exists
    const { data: existingCat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', cat.slug)
      .single()

    const catData = {
      slug: cat.slug,
      title: cat.title,
      display_order: cat.display_order,
      ...(imageUrl ? { image_url: imageUrl } : {})
    }

    if (existingCat) {
      console.log(`Updating existing category ${cat.slug}...`)
      const { error: updateError } = await supabase
        .from('categories')
        .update(catData)
        .eq('id', existingCat.id)
      
      if (updateError) console.error(`Failed to update ${cat.slug}:`, updateError)
      else console.log(`Successfully updated ${cat.slug}.`)
    } else {
      console.log(`Inserting new category ${cat.slug}...`)
      const { error: insertError } = await supabase
        .from('categories')
        .insert([catData])

      if (insertError) console.error(`Failed to insert ${cat.slug}:`, insertError)
      else console.log(`Successfully inserted ${cat.slug}.`)
    }
  }

  console.log('\nSeeding complete!')
}

run().catch(console.error)
