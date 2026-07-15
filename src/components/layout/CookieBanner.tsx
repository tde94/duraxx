"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const { language } = useLanguage();
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("duraxx_cookie_consent");
    if (!consent) {
      setShouldRender(true);
      // Trigger entrance transition after rendering
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(showTimer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("duraxx_cookie_consent", "accepted");
    setIsVisible(false);
    // Remove from DOM after transition completes
    setTimeout(() => setShouldRender(false), 500);
  };

  const handleDecline = () => {
    localStorage.setItem("duraxx_cookie_consent", "declined");
    setIsVisible(false);
    // Remove from DOM after transition completes
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 transition-all duration-500 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl text-white relative">
        <button 
          onClick={handleDecline}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start space-x-3.5 pr-6">
          <div className="p-2 rounded-xl bg-[#00C2A8]/15 border border-[#00C2A8]/20 text-[#00C2A8] shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-3.5">
            <div className="space-y-1">
              <h4 className="text-sm font-bold tracking-tight">
                {language === "DE" ? "Cookie-Einstellungen" : "Cookie Consent"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === "DE" ? (
                  <>
                    Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Durch Klicken auf „Alle akzeptieren“ stimmen Sie der Verwendung zu. Details finden Sie in unserer{" "}
                    <Link href="/datenschutz" className="text-[#00C2A8] hover:underline font-bold">
                      Datenschutzerklärung
                    </Link>.
                  </>
                ) : (
                  <>
                    We use cookies to improve your experience on our website. By clicking "Accept All", you agree to our use of cookies. Find details in our{" "}
                    <Link href="/datenschutz" className="text-[#00C2A8] hover:underline font-bold">
                      Privacy Policy
                    </Link>.
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center space-x-2.5 pt-1">
              <button
                onClick={handleAccept}
                className="flex-1 bg-[#00C2A8] hover:bg-[#00b098] text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center transition-all duration-300 shadow-lg shadow-[#00C2A8]/15"
              >
                {language === "DE" ? "Alle akzeptieren" : "Accept All"}
              </button>
              <button
                onClick={handleDecline}
                className="bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center transition-all duration-350"
              >
                {language === "DE" ? "Ablehnen" : "Decline"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
