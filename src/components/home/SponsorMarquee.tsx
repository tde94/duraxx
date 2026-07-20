"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";



type Partner = {
  id: string;
  name: string;
  description_en: string | null;
  description_de: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
};

export default function SponsorMarquee({ partners }: { partners: Partner[] }) {
  const { language } = useLanguage();
  
  // Use fallback if no dynamic partners, or just use what is passed.
  const displayPartners = partners.length > 0 ? partners : [];
  
  // Duplicate the brand list to create a seamless infinite loop
  const duplicatedBrands = [...displayPartners, ...displayPartners, ...displayPartners, ...displayPartners];

  const headerText =
    language === "DE"
      ? "OFFIZIELLE VERTRIEBS- & LOGISTIKPARTNER"
      : "OFFICIAL DISTRIBUTION & LOGISTIC PARTNERS";

  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-200">
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          {headerText}
        </span>
      </div>

      <div className="relative flex overflow-x-hidden w-full">
        {/* Masking gradients for smooth blending on left/right borders */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll whitespace-nowrap py-4 space-x-8 shrink-0">
          {duplicatedBrands.map((brand, idx) => {
            return (
              <div
                key={`${brand.name}-${idx}`}
                className="inline-flex flex-col items-center justify-center bg-white border border-gray-100 shadow-sm rounded-xl px-8 py-5 min-w-[240px] text-center transition-all duration-300 hover:bg-gray-50 hover:border-brand-turquoise/30 hover:shadow-md group cursor-default"
              >
                {brand.image_url ? (
                  <img 
                    src={brand.image_url} 
                    alt={brand.name} 
                    className="h-12 object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                ) : (
                  <span className="text-lg font-black tracking-wider text-gray-900 group-hover:text-brand-turquoise transition-colors duration-300">
                    {brand.name.toUpperCase()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
