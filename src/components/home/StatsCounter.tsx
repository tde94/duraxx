"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Building2, ShoppingBag, Euro } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  id: string;
  icon: React.ReactNode;
  value: string;
}

const statsData: StatItem[] = [
  {
    id: "experience",
    icon: <Calendar className="w-6 h-6 text-brand-navy" />,
    value: "20+",
  },
  {
    id: "brands",
    icon: <Building2 className="w-6 h-6 text-brand-navy" />,
    value: "5+",
  },
  {
    id: "clients",
    icon: <ShoppingBag className="w-6 h-6 text-brand-navy" />,
    value: "500+",
  },
  {
    id: "order",
    icon: <Euro className="w-6 h-6 text-brand-navy" />,
    value: "500€",
  },
];

export default function StatsCounter() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-turquoise/40 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-turquoise/15 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <span className="block text-3xl font-extrabold text-brand-navy tracking-tight">
                  {stat.id === "order" ? t("stats.order.value") : stat.value}
                </span>
                <span className="block text-sm font-bold text-slate-800">
                  {t(`stats.${stat.id}.label`)}
                </span>
                <span className="block text-xs text-slate-500 leading-normal">
                  {t(`stats.${stat.id}.desc`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
