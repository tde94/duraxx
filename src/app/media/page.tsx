import { cookies } from "next/headers"
import { translations } from "@/data/translations"
import MediaClient from "@/components/media/MediaClient"
import { createClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  const cookieStore = cookies()
  const language = (cookieStore.get("NEXT_LOCALE")?.value as "EN" | "DE") || "EN"
  const ui = translations[language].mediaPage

  const supabase = createClient()
  
  // Fetch active media items
  const { data: mediaItems } = await supabase
    .from('media')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-turquoise/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-turquoise/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-turquoise animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {ui.badge}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            {ui.title}
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-300 font-medium leading-relaxed">
            {ui.desc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MediaClient language={language} mediaItems={mediaItems || []} />
        </div>
      </section>
    </div>
  )
}
