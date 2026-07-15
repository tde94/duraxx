import React from "react";
import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import StatsCounter from "@/components/home/StatsCounter";
import ProductCategories from "@/components/home/ProductCategories";
import SponsorMarquee from "@/components/home/SponsorMarquee";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Hero />
      <StatsCounter />
      <ProductCategories />
      <SponsorMarquee />
      <CTASection />
    </>
  );
}
