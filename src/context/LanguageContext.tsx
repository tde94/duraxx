"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationSchema } from "@/data/translations";

type Language = "EN" | "DE";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (path: string) => any;
  dict: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Safely retrieve persistent language preference on the client side
    const savedLang = localStorage.getItem("duraxx_lang") as Language;
    if (savedLang === "EN" || savedLang === "DE") {
      setLanguageState(savedLang);
    }
    setIsHydrated(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("duraxx_lang", lang);
  };

  const dict = translations[language];

  // Helper function to resolve dot-notation paths like "header.aboutUs"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (path: string): any => {
    const activeDict = translations[language];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = path.split(".").reduce((acc: any, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return acc[part];
      }
      return undefined;
    }, activeDict);

    if (value === undefined) {
      console.warn(`Translation path not found: "${path}" for language: "${language}"`);
      return path;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dict }}>
      <div style={{ opacity: isHydrated ? 1 : 0 }} className="transition-opacity duration-200">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
