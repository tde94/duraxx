"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  article_number: string;
  description: string | null;
  image_url: string | null;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { language } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-brand-navy">
                  {language === "DE" ? "Produktdetails" : "Product Details"}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body (scrollable) */}
              <div className="overflow-y-auto p-6 sm:p-8 flex-1">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  {/* Image */}
                  <div className="w-full sm:w-1/2 aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-6 border border-slate-100 shrink-0">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    ) : (
                      <div className="text-slate-300 font-bold text-2xl">DURAXX</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="w-full sm:w-1/2 space-y-4">
                    <div>
                      <div className="text-xs font-bold text-brand-turquoise tracking-widest uppercase mb-1">
                        {language === "DE" ? "Artikel-Nr" : "Article No"}: {product.article_number}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-brand-navy leading-tight">
                        {product.name}
                      </h2>
                    </div>

                    {product.description && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="bg-brand-navy hover:bg-brand-turquoise text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-brand-turquoise/25"
                >
                  <Mail className="w-4 h-4" />
                  <span>{language === "DE" ? "Angebot anfragen" : "Request a Quote"}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
