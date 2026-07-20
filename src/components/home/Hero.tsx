"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

interface BatteryProduct {
  size: string;
  colorNameKey: string;
  badgeHex: string;
  voltage: string;
  technology: string;
}

const batteryProducts: BatteryProduct[] = [
  {
    size: "10",
    colorNameKey: "Yellow",
    badgeHex: "#FACC15",
    voltage: "1.45V",
    technology: "Zinc-Air",
  },
  {
    size: "312",
    colorNameKey: "Brown",
    badgeHex: "#92400E",
    voltage: "1.45V",
    technology: "Zinc-Air",
  },
  {
    size: "13",
    colorNameKey: "Orange",
    badgeHex: "#F97316",
    voltage: "1.45V",
    technology: "Zinc-Air",
  },
  {
    size: "675",
    colorNameKey: "Blue",
    badgeHex: "#2563EB",
    voltage: "1.45V",
    technology: "Zinc-Air",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  const activeBattery = batteryProducts[activeIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0E2544] to-brand-navy text-white min-h-[85vh] flex items-center py-16">
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-turquoise/10 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl translate-y-12 -translate-x-12 pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and copy */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-turquoise"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("hero.distributorBadge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-balance"
            >
              {t("hero.mainTitle")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-teal-300">
                {t("hero.sloganTitle")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 leading-relaxed text-pretty"
            >
              {t("hero.paragraph")}
            </motion.p>

            {/* Quick trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 py-2 border-y border-white/5"
            >
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-turquoise shrink-0" />
                <span className="text-sm font-semibold text-slate-200">{t("hero.germanQuality")}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Zap className="w-5 h-5 text-brand-turquoise shrink-0" />
                <span className="text-sm font-semibold text-slate-200">{t("hero.expressLogistics")}</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="bg-brand-turquoise hover:bg-teal-400 text-brand-navy font-bold px-8 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-300 shadow-lg shadow-brand-turquoise/20 flex items-center space-x-2 group"
              >
                <span>{t("hero.quoteBtn")}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Battery Interactive Detail Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Battery Size selector tabs */}
            <div className="flex justify-center sm:justify-start gap-2.5 mb-6">
              {batteryProducts.map((battery, idx) => (
                <button
                  key={battery.size}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-white text-brand-navy shadow-lg"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {t("hero.size")} {battery.size}
                  {activeIndex === idx && (
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: battery.badgeHex }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main Interactive Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBattery.size}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                >
                  {/* Glowing background behind active battery */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
                    style={{ backgroundColor: activeBattery.badgeHex }}
                  />

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Visual Battery Mockup badge */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center bg-slate-800/80 shadow-inner">
                        <div
                          className="w-20 h-20 rounded-full flex flex-col items-center justify-center font-black text-2xl shadow-lg"
                          style={{
                            backgroundColor: activeBattery.badgeHex,
                            color: activeBattery.size === "10" ? "#0F172A" : "#FFFFFF",
                          }}
                        >
                          {activeBattery.size}
                        </div>
                        <span className="absolute -bottom-1 text-[10px] font-bold uppercase tracking-wider bg-brand-navy border border-white/10 px-2 py-0.5 rounded-full text-slate-200">
                          {t(`hero.batteries.${activeBattery.size}.color`)}
                        </span>
                      </div>
                    </div>

                    {/* Specifications list */}
                    <div className="flex-grow space-y-4 text-center sm:text-left">
                      <div>
                        <h3 className="text-xl font-bold">
                          {t("hero.powerCell")} {activeBattery.size}
                        </h3>
                        <p className="text-xs text-brand-turquoise font-semibold uppercase tracking-wider mt-0.5">
                          {t("hero.standardColor")}: {t(`hero.batteries.${activeBattery.size}.color`)}
                        </p>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {t(`hero.batteries.${activeBattery.size}.description`)}
                      </p>

                      <div className="grid grid-cols-3 gap-2 text-left pt-2">
                        <div className="bg-white/5 border border-white/5 rounded-lg p-2.5">
                          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t("hero.voltage")}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {activeBattery.voltage}
                          </span>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-lg p-2.5">
                          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t("hero.tech")}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {activeBattery.technology}
                          </span>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-lg p-2.5">
                          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {t("hero.system")}
                          </span>
                          <span className="text-sm font-bold text-white line-clamp-1">
                            Comfort
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 pt-1 text-left">
                        <span className="font-semibold text-slate-200">{t("hero.bestApp")}: </span>
                        {t(`hero.batteries.${activeBattery.size}.bestFor`)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
