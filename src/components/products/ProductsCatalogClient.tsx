"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
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
import ProductModal from "./ProductModal";

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

export default function ProductsCatalogClient({ categories, products }: { categories: any[], products: any[] }) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  
  // Brand Filter State per category
  const [selectedBrands, setSelectedBrands] = useState<Record<string, string | null>>({});

  // Read page translations dictionary
  const ui = pageTranslations[language] || pageTranslations.EN;
  const { t } = useLanguage(); // Added t for nested translations

  // Track active category for sticky navigation pill highlight
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || "");

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

    categories.forEach((category) => {
      const el = document.getElementById(category.slug);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [categories]);

  const handleScrollTo = (slug: string) => {
    setActiveCategory(slug);
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen pb-20">
      <ProductModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />

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
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;
              const shortLabel = category.title;
              const iconKey = category.slug;

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

                  {/* Active Indicator */}
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
          {categories.map((category, index) => {
            const isEven = index % 2 === 1;
            const categoryTitle = category.title;
            const categoryDesc = language === "DE" 
              ? category.description_de || category.description || ""
              : category.description_en || category.description || "";
            const iconKey = category.slug;
            
            // Get features from translations safely
            const rawFeatures = t(`categoriesSection.list.${category.slug}.features`);
            const features = Array.isArray(rawFeatures) ? rawFeatures : [];
            
            // Get products for this category
            let categoryProducts = products.filter(p => p.category_id === category.id);
            
            // Filter by selected brand if any
            const activeBrand = selectedBrands[category.id];
            if (activeBrand) {
              categoryProducts = categoryProducts.filter(p => 
                p.name.toLowerCase().includes(activeBrand.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(activeBrand.toLowerCase()))
              );
            }

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
                    {brandBadges[iconKey] && (
                      (() => {
                        // Find brands that actually have products in this category
                        const availableBrands = brandBadges[iconKey].filter(brand => 
                          products.some(p => 
                            p.category_id === category.id &&
                            (
                              p.name.toLowerCase().includes(brand.toLowerCase()) ||
                              (p.description && p.description.toLowerCase().includes(brand.toLowerCase()))
                            )
                          )
                        );

                        if (availableBrands.length === 0) return null;

                        return (
                          <div className="w-full max-w-sm mt-6 space-y-2.5 text-center lg:text-left">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                              {ui.partnerBadge}
                            </span>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                              {availableBrands.map((brand) => {
                                const isSelected = selectedBrands[category.id] === brand;
                                return (
                                  <button
                                    key={brand}
                                    onClick={() => {
                                      setSelectedBrands(prev => ({
                                        ...prev,
                                        [category.id]: isSelected ? null : brand
                                      }));
                                    }}
                                    className={`text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-all duration-300 ${
                                      isSelected 
                                        ? "bg-brand-navy text-white shadow-md transform scale-105" 
                                        : "bg-white border border-slate-200 text-brand-navy hover:bg-slate-50 hover:border-brand-turquoise/50"
                                    }`}
                                  >
                                    {brand}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>

                  {/* Copy/Features Column - Styled like Homepage Category Cards */}
                  <div className="lg:col-span-7">
                    <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 hover:border-brand-turquoise/25 hover:shadow-xl transition-all duration-300 group">
                      
                      {/* Card Header (Icon & Segment) */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-brand-turquoise/10 transition-colors duration-300">
                          {React.cloneElement(categoryIcons[iconKey] as React.ReactElement, { className: "w-7 h-7 text-brand-turquoise" }) || <Sparkles className="w-7 h-7 text-brand-turquoise" />}
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase bg-slate-50 px-3 py-1.5 rounded-lg">
                          {t("categoriesSection.segment")} 0{index + 1}
                        </span>
                      </div>

                      {/* Card Body (Title & Description) */}
                      <div className="space-y-4 mb-8">
                        <h2 className="text-3xl font-extrabold text-brand-navy group-hover:text-brand-turquoise transition-colors duration-300 tracking-tight">
                          {categoryTitle}
                        </h2>
                        <p className="text-slate-600 text-base leading-relaxed text-pretty">
                          {categoryDesc}
                        </p>
                      </div>

                      {/* Card Features List (Green dots) */}
                      {features && features.length > 0 && (
                        <ul className="space-y-3 pt-6 border-t border-slate-100">
                          {features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start text-sm text-slate-600 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise mt-1.5 mr-3 shrink-0" />
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Action Button at the bottom of the card */}
                      <div className="pt-8 mt-8 border-t border-slate-100">
                        <a
                          href={`/contact?product=${encodeURIComponent(categoryTitle)}`}
                          className="inline-flex items-center space-x-2 text-xs font-bold text-brand-navy hover:text-brand-turquoise tracking-wider uppercase transition-colors"
                        >
                          <span>{ui.ctaBoxBtn}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200/60" />

                {/* Products Grid */}
                <div className="mt-4">
                  {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {categoryProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="bg-white rounded-2xl p-4 border border-slate-200/60 hover:border-brand-turquoise/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left"
                        >
                          <div className="space-y-3">
                            {/* Image Wrapper */}
                            <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 relative">
                              {product.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="text-slate-300 font-bold">DURAXX</div>
                              )}
                            </div>

                            {/* Title */}
                            <div>
                              <div className="text-[10px] font-bold text-brand-turquoise truncate mb-1">
                                {product.article_number}
                              </div>
                              <h4 className="text-sm font-extrabold text-brand-navy tracking-tight leading-snug group-hover:text-brand-turquoise transition-colors duration-250 line-clamp-2">
                                {product.name}
                              </h4>
                            </div>
                          </div>

                          {/* Action Indicator */}
                          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-turquoise transition-colors">
                            <span>{language === "DE" ? "Details anzeigen" : "View Details"}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      {language === "DE" ? "Keine Produkte in dieser Kategorie gefunden." : "No products found in this category."}
                    </div>
                  )}
                </div>
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
