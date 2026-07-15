import React from "react";

export default function BatterieverordnungPage() {
  return (
    <div className="bg-brand-bg min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy border-b pb-4">
          Hinweise zur Batterieentsorgung
        </h1>
        
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Im Zusammenhang mit dem Vertrieb von Batterien oder mit der Lieferung von Geräten, die Batterien enthalten, sind wir verpflichtet, Sie auf folgendes hinzuweisen:
          </p>
          <p>
            Sie sind zur Rückgabe gebrauchter Batterien als Endnutzer gesetzlich verpflichtet. Sie können Altbatterien, die wir als Neubatterien im Sortiment führen oder geführt haben, unentgeltlich an unserem Versandlager (Duraxx GmbH, Auf dem Hüls 12, 40822 Mettmann) zurückgeben.
          </p>

          <h2 className="text-lg font-bold text-brand-navy">Bedeutung der Batteriesymbole</h2>
          <p>
            Die auf den Batterien abgebildeten Symbole haben folgende Bedeutung:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Das Symbol der durchgekreuzten Mülltonne bedeutet, dass die Batterie nicht in den Hausmüll gegeben werden darf.</li>
            <li>Pb = Batterie enthält mehr als 0,004 Masseprozent Blei</li>
            <li>Cd = Batterie enthält mehr als 0,002 Masseprozent Cadmium</li>
            <li>Hg = Batterie enthält mehr als 0,0005 Masseprozent Quecksilber</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
