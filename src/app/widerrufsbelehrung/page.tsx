import React from "react";

export default function WiderrufsbelehrungPage() {
  return (
    <div className="bg-brand-bg min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy border-b pb-4">
          Widerrufsbelehrung
        </h1>
        
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-lg font-bold text-brand-navy">Widerrufsrecht</h2>
          <p>
            Da sich das Angebot der Duraxx GmbH ausschließlich an Unternehmer im Sinne des § 14 BGB (gewerbliche Abnehmer und selbstständige Freiberufler) richtet, besteht kein gesetzliches Widerrufsrecht gemäß Verbraucherschutzrichtlinien.
          </p>
          <p>
            Rückgaben und Reklamationen werden im Einzelfall vertraglich oder auf Kulanzbasis geregelt. Bitte kontaktieren Sie hierzu unseren Support.
          </p>
        </div>
      </div>
    </div>
  );
}
