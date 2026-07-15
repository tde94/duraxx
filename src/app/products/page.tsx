"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { categoriesList } from "@/data/products";
import {
  BatteryCharging,
  Orbit,
  Wrench,
  Sparkles,
  Headphones,
  Check,
  ChevronRight,
  ArrowRight,
  Mail
} from "lucide-react";

// Localized UI strings for Products Catalog page
const pageTranslations = {
  EN: {
    breadcrumbHome: "Home",
    breadcrumbProducts: "Products",
    title: "Our Products",
    subtitle: "From hearing aid batteries to professional audiological equipment — everything you need under one roof.",
    ctaBoxTitle: "Interested in this product line?",
    ctaBoxBtn: "Request a Quote",
    bottomCtaTitle: "Looking for a custom order or bulk pricing?",
    bottomCtaDesc: "Minimum order value: €500 — contact our team for a personalized quote.",
    bottomCtaBtn: "Contact Us",
    partnerBadge: "Partner Brands",
  },
  DE: {
    breadcrumbHome: "Startseite",
    breadcrumbProducts: "Produkte",
    title: "Unsere Produkte",
    subtitle: "Von Hörgerätebatterien bis hin zu professioneller audiologischer Ausrüstung – alles aus einer Hand.",
    ctaBoxTitle: "Interesse an dieser Produktlinie?",
    ctaBoxBtn: "Angebot anfordern",
    bottomCtaTitle: "Suchen Sie nach einer Sonderbestellung oder Mengenpreisen?",
    bottomCtaDesc: "Mindestbestellwert: 500 € — kontaktieren Sie unser Team für ein persönliches Angebot.",
    bottomCtaBtn: "Kontaktieren Sie uns",
    partnerBadge: "Partnermarken",
  }
};

// Mappings for Lucide icons based on category string
const categoryIcons: Record<string, React.ReactNode> = {
  "batteries": <BatteryCharging className="w-5 h-5" />,
  "ear-impression": <Orbit className="w-5 h-5" />,
  "earmold-lab-equipment": <Wrench className="w-5 h-5" />,
  "cleaning-customer-care": <Sparkles className="w-5 h-5" />,
  "audiological-equipment-accessoires": <Headphones className="w-5 h-5" />,
  "audiological-equipment-accessories": <Headphones className="w-5 h-5" />,
};

const largeCategoryIcons: Record<string, React.ReactNode> = {
  "batteries": <BatteryCharging className="w-20 h-20 text-brand-turquoise" />,
  "ear-impression": <Orbit className="w-20 h-20 text-brand-turquoise" />,
  "earmold-lab-equipment": <Wrench className="w-20 h-20 text-brand-turquoise" />,
  "cleaning-customer-care": <Sparkles className="w-20 h-20 text-brand-turquoise" />,
  "audiological-equipment-accessoires": <Headphones className="w-20 h-20 text-brand-turquoise" />,
  "audiological-equipment-accessories": <Headphones className="w-20 h-20 text-brand-turquoise" />,
};

// Brand badges list per category
const brandBadges: Record<string, string[]> = {
  "batteries": ["VARTA", "DURACELL", "POWERONE"],
  "ear-impression": ["DETAX"],
  "earmold-lab-equipment": ["DURAXX LAB"],
  "cleaning-customer-care": ["DURAXX CARE"],
  "audiological-equipment-accessoires": ["DURAXX AUDIO"],
  "audiological-equipment-accessories": ["DURAXX AUDIO"],
};

function ProductsCatalog() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  // Read page translations dictionary
  const ui = pageTranslations[language] || pageTranslations.EN;

  // Track active category for sticky navigation pill highlight
  const [activeCategory, setActiveCategory] = useState("batteries");

  // Track active sub-groups for each category section
  const [activeGroups, setActiveGroups] = useState<Record<string, string>>({
    batteries: "Varta",
    "ear-impression": "Impression Materials",
    "earmold-lab-equipment": "Materials & Silicones",
    "cleaning-customer-care": "Smartclean® Hygiene Range",
    "audiological-equipment-accessoires": "Audiology Accessories",
  });

  // Sync category scroll position from initial search params if present
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryParam) {
      setTimeout(() => {
        const element = document.getElementById(categoryParam);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [categoryParam]);

  // Setup scroll spy observer to track currently visible section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when center of section passes middle of viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    categoriesList.forEach((category) => {
      const el = document.getElementById(category.slug);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (slug: string) => {
    setActiveCategory(slug);
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen pb-20">
      {/* Hide overflow-x scrollbar styles */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main Header / Title Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
          <a href="/" className="hover:text-brand-turquoise transition-colors">
            {ui.breadcrumbHome}
          </a>
          <ChevronRight className="w-3 h-3 text-slate-350" />
          <span className="text-brand-navy">{ui.breadcrumbProducts}</span>
        </nav>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-brand-navy tracking-tight">
            {ui.title}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed text-pretty">
            {ui.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Sticky Categories Bar */}
      <div className="sticky top-[68px] md:top-[76px] z-40 bg-brand-bg/90 backdrop-blur-md border-y border-slate-200/50 py-4 mb-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-3 overflow-x-auto scrollbar-none pb-1">
            {categoriesList.map((category) => {
              const isActive = activeCategory === category.slug;
              const shortLabel = category.shortLabels[language] || category.shortLabels.EN;
              const iconKey = category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => handleScrollTo(category.slug)}
                  className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shrink-0 ${
                    isActive
                      ? "text-white"
                      : "bg-white border border-slate-200 text-brand-navy hover:bg-slate-50"
                  }`}
                >
                  {/* Icon */}
                  <span className={isActive ? "text-white" : "text-brand-turquoise"}>
                    {categoryIcons[iconKey] || <Sparkles className="w-5 h-5" />}
                  </span>
                  
                  {/* Short Label */}
                  <span>{shortLabel}</span>

                  {/* Kayan indicator (layout animations) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#00C2A8] rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area listing all categories vertically */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {categoriesList.map((category, index) => {
            const isEven = index % 2 === 1;
            const categoryTitle = category.titles[language] || category.titles.EN;
            const categoryDesc = category.descriptions[language] || category.descriptions.EN;
            const categoryFeatures = category.features[language] || category.features.EN;
            const iconKey = category.id;

            return (
              <motion.section
                key={category.id}
                id={category.slug}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="py-16 md:py-24 border-b border-slate-200 last:border-0 scroll-mt-36"
              >
                {/* Category Intro Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Visual Graphic Column */}
                  <div className={`lg:col-span-5 flex flex-col items-center ${isEven ? "lg:order-last" : ""}`}>
                    {/* Visual Box */}
                    <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-slate-900 via-[#0B1F3A] to-slate-950 rounded-3xl flex flex-col items-center justify-center border border-white/5 relative shadow-xl overflow-hidden group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                      
                      {/* Category large icon / graphic */}
                      {iconKey === "batteries" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/images/batteries.png"
                          alt="Batteries Illustration"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        />
                      ) : iconKey === "ear-impression" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/images/ear-impression.jpg"
                          alt="Ear Impression Illustration"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        />
                      ) : iconKey === "earmold-lab-equipment" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/images/earmold-lab-equipment.jpg"
                          alt="Earmold Lab Equipment Illustration"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        />
                      ) : iconKey === "cleaning-customer-care" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/images/cleaning-customer-care.png"
                          alt="Cleaning & Customer Care Illustration"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        />
                      ) : iconKey === "audiological-equipment-accessoires" || iconKey === "audiological-equipment-accessories" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/images/audiological-equipment-accessories.png"
                          alt="Audiological Equipment & Accessories Illustration"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        />
                      ) : (
                        <div className="relative z-10 p-8 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                          {largeCategoryIcons[iconKey] || <Sparkles className="w-20 h-20 text-brand-turquoise" />}
                        </div>
                      )}
                    </div>

                    {/* Brands badges below the graphic box */}
                    <div className="w-full max-w-sm mt-6 space-y-2.5 text-center lg:text-left">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        {ui.partnerBadge}
                      </span>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                        {brandBadges[iconKey]?.map((brand) => (
                          <span
                            key={brand}
                            className="text-xs font-bold text-brand-navy bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Copy/Features Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                      <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
                        {categoryTitle}
                      </h2>
                      <p className="text-slate-650 text-base leading-relaxed text-pretty">
                        {categoryDesc}
                      </p>
                    </div>

                    {/* Staggered features checkmark list */}
                    <ul className="space-y-3 pt-2">
                      {categoryFeatures.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-slate-700"
                        >
                          <div className="w-5 h-5 rounded-full bg-brand-turquoise/15 flex items-center justify-center shrink-0 mr-3.5 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-brand-turquoise" />
                          </div>
                          <span className="font-semibold">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Category Inquiry Box */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                      <div className="space-y-1 text-center sm:text-left">
                        <h4 className="text-sm font-bold text-brand-navy">{ui.ctaBoxTitle}</h4>
                      </div>
                      <a
                        href={`/contact?product=${encodeURIComponent(categoryTitle)}`}
                        className="w-full sm:w-auto bg-brand-navy hover:bg-brand-turquoise text-white text-xs font-bold px-6 py-3 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-brand-turquoise/25 flex items-center justify-center space-x-1.5 shrink-0"
                      >
                        <span>{ui.ctaBoxBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>

                </div>

                {/* Sub-Groups Tab Selector (yanyana butonlar şeklinde) */}
                {category.groups && category.groups.length > 1 && (
                  <div className="mt-12 pt-8 border-t border-slate-200/60 overflow-x-auto scrollbar-none pb-3 mb-6">
                    <div className="flex space-x-2.5 min-w-max">
                      {category.groups.map((group) => {
                        const groupKey = group.groupName.EN;
                        const groupLabel = group.groupName[language] || group.groupName.EN;
                        const isActive = (activeGroups[category.id] || category.groups[0].groupName.EN) === groupKey;

                        return (
                          <button
                            key={groupKey}
                            onClick={() => {
                              setActiveGroups(prev => ({
                                ...prev,
                                [category.id]: groupKey
                              }));
                            }}
                            className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 ${
                              isActive
                                ? "text-white bg-[#00C2A8] shadow-md shadow-brand-turquoise/15"
                                : "bg-white border border-slate-200 text-brand-navy hover:bg-slate-50"
                            }`}
                          >
                            {groupLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Visual Divider if no tabs selector is shown */}
                {category.groups && category.groups.length === 1 && (
                  <div className="mt-12 pt-8 border-t border-slate-200/60" />
                )}

                {/* Products Grid for the Active Group */}
                {category.groups && category.groups.length > 0 && (
                  <div className="mt-4">
                    {category.groups
                      .filter((group) => {
                        const groupKey = group.groupName.EN;
                        const activeKey = activeGroups[category.id] || category.groups[0].groupName.EN;
                        return groupKey === activeKey;
                      })
                      .map((group) => (
                        <div key={group.groupName.EN} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {group.items.map((item, itemIdx) => {
                            return (
                              <Link
                                href={`/contact?product=${encodeURIComponent(item.name)}`}
                                key={`${item.name}-${itemIdx}`}
                                className="bg-white rounded-2xl p-4 border border-slate-200/60 hover:border-brand-turquoise/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                              >
                                <div className="space-y-3">
                                  {/* Image Wrapper */}
                                  <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply group-hover:scale-103 transition-transform duration-300"
                                      loading="lazy"
                                    />
                                  </div>

                                  {/* Title */}
                                  <h4 className="text-sm font-extrabold text-brand-navy tracking-tight leading-snug group-hover:text-brand-turquoise transition-colors duration-250 text-center">
                                    {item.name}
                                  </h4>
                                </div>

                                {/* B2B Action Indicator */}
                                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-turquoise transition-colors">
                                  <span>{language === "DE" ? "Anfragen" : "Inquire"}</span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                  </div>
                )}
              </motion.section>
            );
          })}
        </div>
      </div>

      {/* General Page End B2B CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-gradient-to-br from-slate-900 via-[#0B1F3A] to-[#0A1728] text-white rounded-3xl p-8 sm:p-12 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-turquoise/5 rounded-full blur-3xl -translate-y-24 translate-x-24 pointer-events-none" />
          
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {ui.bottomCtaTitle}
            </h3>
            <p className="text-sm text-slate-350 leading-relaxed">
              {ui.bottomCtaDesc}
            </p>
          </div>

          <a
            href="/contact"
            className="w-full md:w-auto bg-brand-turquoise hover:bg-teal-450 text-brand-navy font-bold px-8 py-4 rounded-xl text-sm tracking-wide transition-all duration-300 shrink-0 shadow-lg shadow-brand-turquoise/20 flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>{ui.bottomCtaBtn}</span>
          </a>
        </div>
      </section>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-navy font-bold">
          Loading catalog...
        </div>
      }
    >
      <ProductsCatalog />
    </Suspense>
  );
}
