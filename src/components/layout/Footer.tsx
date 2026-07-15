"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialIcons = {
    facebook: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-wider text-white hover:text-brand-turquoise transition-colors duration-300">
                DURAXX
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href={companyInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-turquoise hover:text-brand-navy flex items-center justify-center transition-all duration-300"
              >
                {socialIcons.facebook}
              </a>
              <a
                href={companyInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-turquoise hover:text-brand-navy flex items-center justify-center transition-all duration-300"
              >
                {socialIcons.linkedin}
              </a>
              <a
                href={companyInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-brand-turquoise hover:text-brand-navy flex items-center justify-center transition-all duration-300"
              >
                {socialIcons.instagram}
              </a>
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-brand-turquoise">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-turquoise shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-brand-turquoise transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-turquoise shrink-0" />
                <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`} className="hover:text-brand-turquoise transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-brand-turquoise">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about-us" className="hover:text-brand-turquoise transition-colors">
                  {t("header.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-turquoise transition-colors">
                  {t("header.products")}
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-brand-turquoise transition-colors">
                  {t("header.videos")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-turquoise transition-colors">
                  {t("header.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href={companyInfo.portalUrl}
                  className="hover:text-brand-turquoise transition-colors flex items-center space-x-1"
                >
                  <span>{t("header.login")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* German Legal Documents */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-brand-turquoise">
              {t("footer.infoDE")}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/uber-uns" className="hover:text-brand-turquoise transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-brand-turquoise transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/agb-kundeninfo" className="hover:text-brand-turquoise transition-colors">
                  Allgemeine Geschäftsbedingungen
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-brand-turquoise transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/widerrufsbelehrung" className="hover:text-brand-turquoise transition-colors">
                  Widerrufsbelehrung
                </Link>
              </li>
              <li>
                <Link href="/batterieverordnung" className="hover:text-brand-turquoise transition-colors">
                  Batterieverordnung
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} {t("footer.copyright")}
          </p>
          <p className="text-xs text-slate-500">
            {t("footer.designedBy")}{" "}
            <span className="text-slate-400 font-bold">
              Deniz Erdogan
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
