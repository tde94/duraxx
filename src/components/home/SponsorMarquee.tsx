"use client";

import React from "react";
import { partnerBrands } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

const brandTranslations: Record<string, Record<"EN" | "DE", string>> = {
  Varta: {
    EN: "Premium German microbattery engineering, renowned for durability and peak voltage performance.",
    DE: "Erstklassige deutsche Mikrobatterie-Entwicklung, bekannt für Langlebigkeit und konstante Höchstspannung.",
  },
  Detax: {
    EN: "Leading manufacturer of high-precision materials and silicones for audiology impression and earmold labs.",
    DE: "Führender Hersteller von hochpräzisen Abformmaterialien und Silikonen für Otoplastik-Labore.",
  },
  "Duracell Active Air": {
    EN: "Long-lasting power with extra long tabs for easy insertion and maximum comfort.",
    DE: "Langlebige Energie mit extralangen Laschen für einfaches Einsetzen und maximalen Komfort.",
  },
  Powerone: {
    EN: "Eco-friendly, mercury-free batteries manufactured under strict quality standards in Germany.",
    DE: "Umweltfreundliche, quecksilberfreie Qualitätsbatterien hergestellt unter strengen Standards in Deutschland.",
  },
  "Duraxx Hearing": {
    EN: "Custom-tailored acoustic accessories and B2B audiology solutions.",
    DE: "Maßgeschneidertes Akustikzubehör und B2B-Lösungen für die Hörakustik.",
  },
};

export default function SponsorMarquee() {
  const { language } = useLanguage();
  // Duplicate the brand list to create a seamless infinite loop
  const duplicatedBrands = [...partnerBrands, ...partnerBrands, ...partnerBrands];

  const headerText =
    language === "DE"
      ? "OFFIZIELLE VERTRIEBS- & LOGISTIKPARTNER"
      : "OFFICIAL DISTRIBUTION & LOGISTIC PARTNERS";

  return (
    <section className="py-12 bg-slate-900 overflow-hidden border-y border-slate-800">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          {headerText}
        </span>
      </div>

      <div className="relative flex overflow-x-hidden w-full">
        {/* Masking gradients for smooth blending on left/right borders */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll whitespace-nowrap py-4 space-x-12 shrink-0">
          {duplicatedBrands.map((brand, idx) => {
            const translation = brandTranslations[brand.name]?.[language] || brand.description;
            
            return (
              <div
                key={`${brand.name}-${idx}`}
                className="inline-flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl px-8 py-5 min-w-[240px] text-center transition-all duration-300 hover:bg-white/10 hover:border-brand-turquoise/50 group cursor-default"
              >
                <span className="text-lg font-black tracking-wider text-white group-hover:text-brand-turquoise transition-colors duration-300">
                  {brand.name.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-400 mt-1.5 whitespace-normal leading-normal max-w-[200px]">
                  {translation}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
