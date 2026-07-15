import React from "react";

export default function ImpressumPage() {
  return (
    <div className="bg-brand-bg min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy border-b pb-4">
          Impressum
        </h1>
        
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-lg font-bold text-brand-navy">Angaben gemäß § 5 TMG</h2>
          <p>
            Duraxx GmbH<br />
            Auf dem Hüls 12<br />
            40822 Mettmann<br />
            Deutschland
          </p>

          <h2 className="text-lg font-bold text-brand-navy">Vertreten durch:</h2>
          <p>Geschäftsführung der Duraxx GmbH</p>

          <h2 className="text-lg font-bold text-brand-navy">Kontakt</h2>
          <p>
            Telefon: +49 (0) 2104 123456<br />
            E-Mail: info@duraxx.de
          </p>

          <h2 className="text-lg font-bold text-brand-navy">Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht Wuppertal<br />
            Registernummer: HRB 12345 (Dummy-Eintrag zur Veranschaulichung)
          </p>

          <h2 className="text-lg font-bold text-brand-navy">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE 123456789 (Dummy)
          </p>

          <h2 className="text-lg font-bold text-brand-navy">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-brand-turquoise hover:underline">https://ec.europa.eu/consumers/odr</a>.<br />
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </div>
  );
}
