import React from "react";
import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import StatsCounter from "@/components/home/StatsCounter";
import ProductCategories from "@/components/home/ProductCategories";
import SponsorMarquee from "@/components/home/SponsorMarquee";
import CTASection from "@/components/home/CTASection";
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createClient()
  
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .limit(1)

  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  const activeAnnouncement = announcements?.[0]

  return (
    <>
      <PromoBanner announcement={activeAnnouncement} />
      <Hero />
      <StatsCounter />
      <ProductCategories />
      <SponsorMarquee partners={partners || []} />
      <CTASection />
    </>
  );
}
