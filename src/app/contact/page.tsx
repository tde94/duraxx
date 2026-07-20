"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Mail, Phone, Clock, FileText, Send, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "./actions";

function ContactFormSection() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    vatId: "",
    email: "",
    phone: "",
    interest: "batteries",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync B2B interest pre-fill from query param
  useEffect(() => {
    if (interestParam) {
      const validOptions = ["batteries", "ear-impression", "earmold-lab-equipment", "cleaning-customer-care", "audiological-equipment-accessoires"];
      // Fallback mappings if interest uses product sub-category slugs
      let resolvedInterest = interestParam;
      if (interestParam === "impression") resolvedInterest = "ear-impression";
      if (interestParam === "lab") resolvedInterest = "earmold-lab-equipment";
      if (interestParam === "hygiene") resolvedInterest = "cleaning-customer-care";
      if (interestParam === "audiology") resolvedInterest = "audiological-equipment-accessoires";

      if (validOptions.includes(resolvedInterest)) {
        setFormData((prev) => ({
          ...prev,
          interest: resolvedInterest,
        }));
      }
    }
  }, [interestParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          vatId: "",
          email: "",
          phone: "",
          interest: "batteries",
          message: "",
        });
      }, 4000);
    } catch (error) {
      alert("Message could not be sent. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-brand-bg min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0B1F3A] to-[#081525] text-white py-16 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-turquoise">
            {t("contactPage.badge")}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {t("contactPage.title")}
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            {t("contactPage.desc")}
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">
                {t("contactPage.hqTitle")}
              </h2>
              <div className="h-1 w-12 bg-brand-turquoise rounded-full" />

              <div className="space-y-5 text-sm text-slate-600">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin className="w-5 h-5 text-brand-turquoise" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-bold text-brand-navy">{t("contactPage.addressLabel")}</span>
                    <span>
                      {companyInfo.address.street}
                      <br />
                      {companyInfo.address.city} / {companyInfo.address.country}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Mail className="w-5 h-5 text-brand-turquoise" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-bold text-brand-navy">{t("contactPage.emailLabel")}</span>
                    <a href={`mailto:${companyInfo.email}`} className="hover:text-brand-turquoise transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Phone className="w-5 h-5 text-brand-turquoise" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-bold text-brand-navy">{t("contactPage.phoneLabel")}</span>
                    <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`} className="hover:text-brand-turquoise transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Clock className="w-5 h-5 text-brand-turquoise" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-bold text-brand-navy">{t("contactPage.hoursLabel")}</span>
                    <span>{t("contactPage.hoursValue")}</span>
                    <span className="block text-[11px] text-slate-400 font-semibold">{t("contactPage.cetLabel")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Graphic Placeholder */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-white/5 shadow-md relative overflow-hidden flex flex-col justify-end min-h-[220px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#0f2e5c_0%,transparent_100%)] pointer-events-none opacity-40" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
              
              <div className="relative z-10 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-brand-turquoise bg-brand-turquoise/15 px-2 py-0.5 rounded border border-brand-turquoise/35 inline-block">
                  {t("contactPage.mapTag")}
                </span>
                <h3 className="text-lg font-bold">{t("contactPage.mapTitle")}</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  {t("contactPage.mapDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive B2B Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative">
              
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-turquoise/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-brand-turquoise animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy">{t("contactPage.successTitle")}</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                    {t("contactPage.successDesc")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-brand-navy">{t("contactPage.formTitle")}</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {t("contactPage.formDesc")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-xs font-bold text-brand-navy/70 uppercase">
                        {t("contactPage.firstName")}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-xs font-bold text-brand-navy/70 uppercase">
                        {t("contactPage.lastName")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="companyName" className="text-xs font-bold text-brand-navy/70 uppercase flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" /> {t("contactPage.companyName")}
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50"
                      />
                    </div>
                    {/* VAT ID */}
                    <div className="space-y-1.5">
                      <label htmlFor="vatId" className="text-xs font-bold text-brand-navy/70 uppercase flex items-center gap-1.5">
                        {t("contactPage.vatId")} <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="vatId"
                        id="vatId"
                        placeholder="e.g. DE123456789"
                        value={formData.vatId}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-brand-navy/70 uppercase">
                        {t("contactPage.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-brand-navy/70 uppercase">
                        {t("contactPage.phone")}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50"
                      />
                    </div>
                  </div>

                  {/* Segment of Interest */}
                  <div className="space-y-1.5">
                    <label htmlFor="interest" className="text-xs font-bold text-brand-navy/70 uppercase">
                      {t("contactPage.interest")}
                    </label>
                    <select
                      name="interest"
                      id="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50"
                    >
                      <option value="batteries">{t("contactPage.interests.batteries")}</option>
                      <option value="ear-impression">{t("contactPage.interests.impression")}</option>
                      <option value="earmold-lab-equipment">{t("contactPage.interests.lab")}</option>
                      <option value="cleaning-customer-care">{t("contactPage.interests.hygiene")}</option>
                      <option value="audiological-equipment-accessoires">{t("contactPage.interests.audiology")}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-brand-navy/70 uppercase">
                      {t("contactPage.message")}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={4}
                      placeholder={t("contactPage.messagePlaceholder")}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise outline-none bg-slate-50 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-turquoise text-white font-bold py-3.5 rounded-xl text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-brand-turquoise/25"
                  >
                    <span>{t("contactPage.submitBtn")}</span>
                    <Send className="w-4 h-4 shrink-0" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-navy font-bold">
          Loading contact form...
        </div>
      }
    >
      <ContactFormSection />
    </Suspense>
  );
}
