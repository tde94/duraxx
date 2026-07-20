"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-brand-bg relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B1F3A] to-[#0A1728] text-white p-8 sm:p-16 shadow-2xl border border-white/5"
        >
          {/* Accent light elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-turquoise/10 rounded-full blur-3xl -translate-y-24 translate-x-24 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl translate-y-24 -translate-x-24 pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-brand-turquoise bg-brand-turquoise/10 border border-brand-turquoise/25 px-3.5 py-1.5 rounded-full inline-block">
              {t("cta.badge")}
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {t("cta.title")}
            </h2>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {t("cta.desc")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">

              {/* Contact Link */}
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 text-brand-turquoise shrink-0" />
                <span>{t("cta.quoteBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="text-[11px] text-slate-500 pt-4">
              {t("cta.note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
