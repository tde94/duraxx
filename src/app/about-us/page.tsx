"use client";

import { aboutSections } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Truck, BarChart3, HeartPulse, CreditCard, Users2 } from "lucide-react";

export default function AboutUsPage() {
  const { t } = useLanguage();

  // Mapping English titles to matching icons
  const iconMap: Record<string, React.ReactNode> = {
    "Contact Person": <Users2 className="w-5 h-5 text-brand-turquoise" />,
    "Logistic and Shipping": <Truck className="w-5 h-5 text-brand-turquoise" />,
    "Battery Wholesale": <BarChart3 className="w-5 h-5 text-brand-turquoise" />,
    "Hearing Aid Accessories": <ShieldCheck className="w-5 h-5 text-brand-turquoise" />,
    "Medical Products": <HeartPulse className="w-5 h-5 text-brand-turquoise" />,
    "Payment": <CreditCard className="w-5 h-5 text-brand-turquoise" />,
  };

  return (
    <div className="bg-brand-bg min-h-screen">
      
      {/* Sub-Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0B1F3A] to-[#081525] text-white py-16 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-turquoise">
            {t("aboutUsPage.badge")}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {t("aboutUsPage.title")}
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            {t("aboutUsPage.desc")}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual Brand Statement Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-gradient-to-b from-slate-900 to-[#0F233F] text-white rounded-3xl p-8 border border-white/5 shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-turquoise/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-brand-turquoise uppercase tracking-widest block">
                  {t("aboutUsPage.philosophy")}
                </span>
                <h2 className="text-2xl font-black tracking-tight">
                  {t("aboutUsPage.philosophyTitle")}
                </h2>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {t("aboutUsPage.philosophyDesc")}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-brand-turquoise" />
                  </div>
                  <span>{t("aboutUsPage.distributorBadge")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-brand-turquoise" />
                  </div>
                  <span>{t("aboutUsPage.logisticsBadge")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Sections */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutSections.map((section) => (
                <div
                  key={section.title}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-turquoise/10 flex items-center justify-center shrink-0">
                      {iconMap[section.title] || <ShieldCheck className="w-5 h-5 text-brand-turquoise" />}
                    </div>
                    <h3 className="text-base font-bold text-brand-navy">
                      {t(`aboutUsPage.sections.${section.title}.title`)}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(`aboutUsPage.sections.${section.title}.content`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
