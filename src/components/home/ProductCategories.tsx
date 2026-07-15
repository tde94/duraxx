"use client";

import React from "react";
import { motion } from "framer-motion";
import { BatteryCharging, Orbit, Wrench, Sparkles, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";
import { productCategories } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductCategories() {
  const { t } = useLanguage();

  // Mapping of category IDs to custom Lucide icons
  const iconMap: Record<string, React.ReactNode> = {
    "batteries": <BatteryCharging className="w-6 h-6 text-brand-turquoise" />,
    "ear-impression": <Orbit className="w-6 h-6 text-brand-turquoise" />,
    "earmold-lab-equipment": <Wrench className="w-6 h-6 text-brand-turquoise" />,
    "cleaning-customer-care": <Sparkles className="w-6 h-6 text-brand-turquoise" />,
    "audiological-equipment-accessoires": <Headphones className="w-6 h-6 text-brand-turquoise" />,
  };

  return (
    <section id="categories" className="py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-brand-turquoise">
            {t("categoriesSection.badge")}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {t("categoriesSection.title")}
          </p>
          <div className="h-1 w-16 bg-brand-turquoise mx-auto rounded-full" />
          <p className="text-slate-600 leading-relaxed text-pretty">
            {t("categoriesSection.desc")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => {
            const features = t(`categoriesSection.list.${category.id}.features`) as string[];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-slate-100 hover:border-brand-turquoise/25 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Header Icon + ID */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-brand-turquoise/10 transition-colors duration-300">
                      {iconMap[category.id] || <Sparkles className="w-6 h-6 text-brand-turquoise" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase bg-slate-50 px-2.5 py-1 rounded-md">
                      {t("categoriesSection.segment")} 0{index + 1}
                    </span>
                  </div>

                  {/* Info Text */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-turquoise transition-colors duration-300">
                      {t(`categoriesSection.list.${category.id}.name`)}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {t(`categoriesSection.list.${category.id}.description`)}
                    </p>
                  </div>

                  {/* Key Benefits List */}
                  <ul className="space-y-2 pt-2 border-t border-slate-50">
                    {features && features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise mt-1.5 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Link */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={`/products#${category.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-brand-navy hover:text-brand-turquoise tracking-wider uppercase transition-colors"
                  >
                    <span>{t("categoriesSection.action")}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
