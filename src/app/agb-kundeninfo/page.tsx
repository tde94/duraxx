import React from "react";

export default function AGBPage() {
  return (
    <div className="bg-brand-bg min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy border-b pb-4">
          Allgemeine Geschäftsbedingungen
        </h1>
        
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-lg font-bold text-brand-navy">§ 1 Geltungsbereich und allgemeine Bestimmungen</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Geschäftsbeziehungen zwischen der Duraxx GmbH (nachfolgend: Anbieter) und ihren Kunden (B2B, gewerbliche Abnehmer).
          </p>

          <h2 className="text-lg font-bold text-brand-navy">§ 2 Vertragsabschluss und Mindestbestellwert</h2>
          <p>
            Unsere Angebote richten sich ausschließlich an gewerbliche Kunden. Der Mindestbestellwert für Lieferungen beträgt 500 € netto pro Bestellung.
          </p>

          <h2 className="text-lg font-bold text-brand-navy">§ 3 Zahlungsbedingungen</h2>
          <p>
            Zahlungen sind ausschließlich per Banküberweisung auf das in der Rechnung angegebene Bankkonto zu leisten. Andere Zahlungsarten (Kreditkarte, PayPal etc.) werden nicht angeboten.
          </p>

          <h2 className="text-lg font-bold text-brand-navy">§ 4 Eigentumsvorbehalt</h2>
          <p>
            Die gelieferte Ware bleibt bis zur vollständigen Bezahlung aller Forderungen aus der Geschäftsbeziehung im Eigentum der Duraxx GmbH.
          </p>
        </div>
      </div>
    </div>
  );
}
