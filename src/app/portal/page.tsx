"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Shield, Hourglass, ArrowLeft, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  EN: {
    statusBadge: "Phase 2 Development",
    title: "Duraxx B2B Portal",
    subtitle: "Coming Soon",
    desc: "We are building a secure B2B platform for seamless product ordering, bulk pricing, invoice management, and real-time shipping tracking. Our portal will be available shortly.",
    feature1: "Direct B2B Ordering & Bulk Discounts",
    feature2: "Live Order Status & Shipping Tracking",
    feature3: "Invoice & Payment History Archive",
    btnBack: "Back to Homepage",
    btnContact: "Contact for Inquiries",
  },
  DE: {
    statusBadge: "Entwicklungsphase 2",
    title: "Duraxx B2B-Portal",
    subtitle: "Demnächst Verfügbar",
    desc: "Wir entwickeln eine sichere B2B-Plattform für nahtlose Produktbestellungen, Mengenrabatte, Rechnungsverwaltung und Versandverfolgung in Echtzeit. Unser Portal steht Ihnen in Kürze zur Verfügung.",
    feature1: "Direkte B2B-Bestellung & Mengenrabatte",
    feature2: "Live-Bestellstatus & Versandverfolgung",
    feature3: "Archiv für Rechnungs- und Zahlungsverlauf",
    btnBack: "Zurück zur Startseite",
    btnContact: "Kontakt für Anfragen",
  }
};

export default function PortalComingSoon() {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-turquoise/5 rounded-full blur-3xl -translate-y-24 translate-x-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl translate-y-24 -translate-x-24 pointer-events-none" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,31,58,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Portal Coming Soon Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 relative overflow-hidden"
        >
          {/* Top Decorative Header Area */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-turquoise via-teal-400 to-brand-navy" />

          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Animated Lock/Progress Icon */}
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-brand-turquoise/40 flex items-center justify-center bg-slate-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-navy text-brand-turquoise flex items-center justify-center shadow-lg">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Development Status Pill */}
            <div className="inline-flex items-center space-x-1.5 bg-brand-turquoise/10 border border-brand-turquoise/25 text-brand-turquoise px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Hourglass className="w-3.5 h-3.5 shrink-0" />
              <span>{t.statusBadge}</span>
            </div>

            {/* Title Block */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl font-extrabold text-brand-turquoise">
                {t.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg text-pretty">
              {t.desc}
            </p>

            {/* Feature Highlights Grid */}
            <div className="w-full max-w-md bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-3.5 mt-4">
              <div className="flex items-start space-x-3 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-brand-turquoise/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-3 h-3 text-brand-turquoise" />
                </div>
                <span className="font-bold">{t.feature1}</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-brand-turquoise/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-3 h-3 text-brand-turquoise" />
                </div>
                <span className="font-bold">{t.feature2}</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-brand-turquoise/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-3 h-3 text-brand-turquoise" />
                </div>
                <span className="font-bold">{t.feature3}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
              <Link
                href="/"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand-navy hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-brand-navy/20 group"
              >
                <ArrowLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                <span>{t.btnBack}</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 text-brand-navy font-bold px-8 py-3.5 rounded-xl text-sm tracking-wide transition-colors duration-300 group"
              >
                <span>{t.btnContact}</span>
                <ArrowRight className="w-4 h-4 text-brand-turquoise shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
