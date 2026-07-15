"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Play, Film } from "lucide-react";

interface VideoItem {
  duration: string;
}

const sampleVideos: VideoItem[] = [
  { duration: "4:12" },
  { duration: "5:45" },
  { duration: "3:30" },
];

export default function VideosPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-brand-bg min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0B1F3A] to-[#081525] text-white py-16 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-turquoise">
            {t("videosPage.badge")}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {t("videosPage.title")}
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            {t("videosPage.desc")}
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleVideos.map((video, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Fake Video Player Thumbnail */}
              <div className="bg-slate-900 aspect-video relative flex items-center justify-center overflow-hidden">
                {/* Visual grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Floating Category Tag */}
                <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider bg-brand-turquoise text-brand-navy px-2.5 py-1 rounded-md">
                  {t(`videosPage.list.${idx}.category`)}
                </span>

                {/* Duration Tag */}
                <span className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded">
                  {video.duration}
                </span>

                {/* Play Button Icon */}
                <div className="w-14 h-14 rounded-full bg-brand-turquoise text-brand-navy flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play className="w-6 h-6 fill-brand-navy ml-0.5" />
                </div>
              </div>

              {/* Video Description Info */}
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-turquoise transition-colors duration-300">
                    {t(`videosPage.list.${idx}.title`)}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t(`videosPage.list.${idx}.description`)}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Film className="w-3.5 h-3.5" />
                  <span>{t("videosPage.walkthrough")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
