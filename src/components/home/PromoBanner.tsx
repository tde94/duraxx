"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";

export default function PromoBanner({ announcement }: { announcement?: any }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Avoid flash on mount and check local storage to persist dismissal
    const dismissed = localStorage.getItem(`duraxx_promo_dismissed_${announcement?.id}`);
    if (dismissed === "true") {
      setIsVisible(false);
    }
    setIsMounted(true);
  }, [announcement?.id]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (announcement?.id) {
      localStorage.setItem(`duraxx_promo_dismissed_${announcement.id}`, "true");
    }
  };

  // If no announcement is provided, don't render anything
  if (!announcement || !isMounted || !isVisible) return null;

  // Scrolling greeting text repeating
  const marqueeText = `${announcement.title} - ${announcement.description} `;
  const repeatedMarquee = Array(12).fill(marqueeText).join("   •   ");

  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-slate-900 border-b border-brand-turquoise/25 py-3.5 relative overflow-hidden select-none"
      >
        {/* Global stylesheet for marquee animation */}
        <style jsx global>{`
          @keyframes marqueeScrollSlow {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee-slow {
            display: inline-flex;
            white-space: nowrap;
            animation: marqueeScrollSlow 75s linear infinite;
          }
          .animate-marquee-slow:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative pr-10">
          {/* Gift Icon Indicator */}
          <div className="absolute left-4 sm:left-6 lg:left-8 z-10 flex items-center bg-slate-900 pr-3 text-brand-turquoise">
            <Gift className="w-5 h-5 animate-bounce" />
          </div>

          {/* Marquee Ticker */}
          <div className="w-full overflow-hidden pl-8">
            <div className="flex w-max animate-marquee-slow">
              <span className="text-brand-turquoise text-lg font-black uppercase tracking-wider pr-4">
                {repeatedMarquee}
              </span>
              <span className="text-brand-turquoise text-lg font-black uppercase tracking-wider">
                {repeatedMarquee}
              </span>
            </div>
          </div>

          {/* Dismiss Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute right-4 sm:right-6 lg:right-8 text-slate-450 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors duration-200 z-20"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
