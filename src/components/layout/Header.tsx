"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ExternalLink, Globe } from "lucide-react";
import { companyInfo, productCategories } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-slate-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-wider text-brand-navy hover:text-brand-turquoise transition-colors duration-300">
              DURAXX
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider text-brand-turquoise border border-brand-turquoise/40 px-1.5 py-0.5 rounded uppercase">
              {companyInfo.slogan}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/about-us"
              className={`text-sm font-semibold tracking-wide hover:text-brand-turquoise transition-colors duration-200 relative ${
                pathname === "/about-us" ? "text-brand-turquoise" : "text-brand-navy"
              }`}
            >
              {t("header.aboutUs")}
              {pathname === "/about-us" && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-brand-turquoise"
                />
              )}
            </Link>

            {/* Products Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 text-sm font-semibold tracking-wide hover:text-brand-turquoise transition-colors duration-200 ${
                  pathname.startsWith("/products") ? "text-brand-turquoise" : "text-brand-navy"
                }`}
              >
                <span>{t("header.products")}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-3 overflow-hidden z-50"
                  >
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <span className="text-xs font-bold text-brand-navy/55 uppercase tracking-wider">
                        {t("header.categories")}
                      </span>
                    </div>
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.slug}`}
                        className="flex flex-col px-4 py-2.5 hover:bg-slate-50 transition-colors duration-200"
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        <span className="text-sm font-semibold text-brand-navy hover:text-brand-turquoise transition-colors">
                          {t(`categoriesSection.list.${category.id}.name`)}
                        </span>
                        <span className="text-xs text-slate-500 line-clamp-1">
                          {t(`categoriesSection.list.${category.id}.description`)}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/media"
              className={`text-sm font-semibold tracking-wide hover:text-brand-turquoise transition-colors duration-200 relative ${
                pathname === "/media" ? "text-brand-turquoise" : "text-brand-navy"
              }`}
            >
              {t("header.media")}
              {pathname === "/media" && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-brand-turquoise"
                />
              )}
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-semibold tracking-wide hover:text-brand-turquoise transition-colors duration-200 relative ${
                pathname === "/contact" ? "text-brand-turquoise" : "text-brand-navy"
              }`}
            >
              {t("header.contact")}
              {pathname === "/contact" && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-brand-turquoise"
                />
              )}
            </Link>
          </nav>

          {/* Right Section: Language + Login */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-xs font-semibold text-brand-navy">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => setLanguage("EN")}
                className={`hover:text-brand-turquoise transition-colors ${
                  language === "EN" ? "text-brand-turquoise font-bold" : ""
                }`}
              >
                EN
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage("DE")}
                className={`hover:text-brand-turquoise transition-colors ${
                  language === "DE" ? "text-brand-turquoise font-bold" : ""
                }`}
              >
                DE
              </button>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-brand-navy hover:text-brand-turquoise transition-colors p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-4">
              <Link
                href="/about-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-bold text-brand-navy py-2 border-b border-slate-50"
              >
                {t("header.aboutUs")}
              </Link>

              {/* Products Sub-list for Mobile */}
              <div className="space-y-1.5 py-1">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {t("header.products")}
                </span>
                {productCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-brand-navy/80 hover:text-brand-turquoise pl-3 py-1.5 border-l-2 border-slate-100 hover:border-brand-turquoise"
                  >
                    {t(`categoriesSection.list.${category.id}.name`)}
                  </Link>
                ))}
              </div>

              <Link
                href="/media"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-bold text-brand-navy py-2 border-b border-slate-50"
              >
                {t("header.media")}
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-bold text-brand-navy py-2 border-b border-slate-50"
              >
                {t("header.contact")}
              </Link>

              {/* Language Selector + Login inside Drawer */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-slate-500 flex items-center gap-1">
                    <Globe className="w-4 h-4" /> {t("header.langLabel")}:
                  </span>
                  <div className="flex space-x-2 font-bold text-brand-navy">
                    <button
                      onClick={() => {
                        setLanguage("EN");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-2.5 py-1 rounded border ${
                        language === "EN"
                          ? "border-brand-turquoise text-brand-turquoise bg-brand-turquoise/5"
                          : "border-slate-200"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("DE");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-2.5 py-1 rounded border ${
                        language === "DE"
                          ? "border-brand-turquoise text-brand-turquoise bg-brand-turquoise/5"
                          : "border-slate-200"
                      }`}
                    >
                      DE
                    </button>
                  </div>
                </div>


              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
