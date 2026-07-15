export interface TranslationSchema {
  header: {
    aboutUs: string;
    products: string;
    videos: string;
    contact: string;
    login: string;
    categories: string;
    langLabel: string;
  };
  footer: {
    description: string;
    contactUs: string;
    quickLinks: string;
    infoDE: string;
    copyright: string;
    designedBy: string;
    address: string;
  };
  hero: {
    distributorBadge: string;
    mainTitle: string;
    sloganTitle: string;
    paragraph: string;
    germanQuality: string;
    expressLogistics: string;
    quoteBtn: string;
    portalBtn: string;
    size: string;
    color: string;
    standardColor: string;
    bestApp: string;
    voltage: string;
    tech: string;
    system: string;
    powerCell: string;
    batteries: Record<string, {
      name: string;
      color: string;
      description: string;
      bestFor: string;
    }>;
  };
  stats: {
    experience: { label: string; desc: string };
    brands: { label: string; desc: string };
    clients: { label: string; desc: string };
    order: { label: string; desc: string; value: string };
  };
  categoriesSection: {
    badge: string;
    title: string;
    desc: string;
    action: string;
    segment: string;
    list: Record<string, {
      name: string;
      description: string;
      features: string[];
    }>;
  };
  cta: {
    badge: string;
    title: string;
    desc: string;
    portalBtn: string;
    quoteBtn: string;
    note: string;
  };
  aboutUsPage: {
    badge: string;
    title: string;
    desc: string;
    philosophy: string;
    philosophyTitle: string;
    philosophyDesc: string;
    distributorBadge: string;
    logisticsBadge: string;
    sections: Record<string, {
      title: string;
      content: string;
    }>;
  };
  productsPage: {
    badge: string;
    title: string;
    desc: string;
    sidebarTitle: string;
    sideBoxTitle: string;
    sideBoxDesc: string;
    sideBoxBtn: string;
    techAdvantage: string;
    wholesaleModels: string;
    orderPortalNote: string;
    orderPortalBtn: string;
    sampleCatalog: Record<string, string[]>;
  };
  contactPage: {
    badge: string;
    title: string;
    desc: string;
    hqTitle: string;
    addressLabel: string;
    emailLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    hoursValue: string;
    cetLabel: string;
    mapTag: string;
    mapTitle: string;
    mapDesc: string;
    successTitle: string;
    successDesc: string;
    formTitle: string;
    formDesc: string;
    firstName: string;
    lastName: string;
    companyName: string;
    vatId: string;
    email: string;
    phone: string;
    interest: string;
    message: string;
    messagePlaceholder: string;
    submitBtn: string;
    interests: Record<string, string>;
  };
  videosPage: {
    badge: string;
    title: string;
    desc: string;
    walkthrough: string;
    list: Array<{
      title: string;
      category: string;
      description: string;
    }>;
  };
}

export const translations: Record<"EN" | "DE", TranslationSchema> = {
  EN: {
    header: {
      aboutUs: "About Us",
      products: "Products",
      videos: "Videos",
      contact: "Contact",
      login: "Customer Login",
      categories: "Categories",
      langLabel: "Language",
    },
    footer: {
      description: "Premium wholesale distributor of world-class hearing aid batteries and specialized audiologist accessories. Committed to quality, reliability, and B2B excellence.",
      contactUs: "Contact Us",
      quickLinks: "Quick Links",
      infoDE: "Information (DE)",
      copyright: "Duraxx GmbH. All Rights Reserved.",
      designedBy: "Designed by",
      address: "Auf dem Hüls 12\n40822 Mettmann / Deutschland",
    },
    hero: {
      distributorBadge: "Official Wholesale Partner & Distributor",
      mainTitle: "Reliable Power for",
      sloganTitle: "Hearing Devices",
      paragraph: "We distribute premium-grade zinc-air microbatteries and earmold laboratory equipment directly to acousticians, clinics, and resellers across Europe.",
      germanQuality: "100% German Quality",
      expressLogistics: "Express B2B Logistics",
      quoteBtn: "Request Custom B2B Quote",
      portalBtn: "Go to Portal",
      size: "Size",
      color: "Color",
      standardColor: "Standard Color Code",
      bestApp: "Best application",
      voltage: "Voltage",
      tech: "Tech",
      system: "System",
      powerCell: "Zinc-Air Power Cell",
      batteries: {
        "10": {
          name: "Zinc-Air Power Cell Size 10",
          color: "Yellow",
          description: "Ultra-compact zinc-air battery designed for small completely-in-canal (CIC) and mini-receiver-in-canal (mini-RIC) hearing instruments.",
          bestFor: "CIC & Mini-RIC Hearing Aids",
        },
        "312": {
          name: "Zinc-Air Power Cell Size 312",
          color: "Brown",
          description: "The most popular hearing aid battery size, providing the perfect balance of compact dimension and reliable, long-lasting energy capacity.",
          bestFor: "RIC & Micro-BTE Hearing Aids",
        },
        "13": {
          name: "Zinc-Air Power Cell Size 13",
          color: "Orange",
          description: "High-performance power cell engineered for behind-the-ear (BTE) and in-the-ear (ITE) hearing systems requiring sustained voltage under load.",
          bestFor: "BTE & ITE Devices",
        },
        "675": {
          name: "Zinc-Air Power Cell Size 675",
          color: "Blue",
          description: "Heavy-duty power source optimized for high-power behind-the-ear (BTE) aids and cochlear implant processors requiring peak current support.",
          bestFor: "High-Power BTE & Cochlear Implants",
        },
      },
    },
    stats: {
      experience: {
        label: "Years of Experience",
        desc: "Deep audiology expertise & reliable partnerships since our founding.",
      },
      brands: {
        label: "Verified Brands",
        desc: "Official wholesale distributor for Varta, Detax, Duracell, Powerone.",
      },
      clients: {
        label: "B2B Clients Active",
        desc: "Supplying acoustic shops, labs, and resellers across Germany.",
      },
      order: {
        value: "500€",
        label: "Minimum Order Value",
        desc: "Optimized logistics tailored for wholesale commercial order sizes.",
      },
    },
    categoriesSection: {
      badge: "B2B Product Range",
      title: "Our Core Audiology Segments",
      desc: "From world-class zinc-air cells to advanced impression silicones and earmold laboratory systems, we supply acoustic shops with everything required for daily operations.",
      action: "Explore Catalog",
      segment: "Segment",
      list: {
        batteries: {
          name: "Batteries",
          description: "Premium zinc-air hearing aid batteries providing stable voltage and long lifetime for all digital and analog hearing systems.",
          features: [
            "Stable voltage level for clear sound amplification",
            "Mercury-free, high-capacity zinc-air technology",
            "Sizes: 10 (Yellow), 312 (Brown), 13 (Orange), 675 (Blue)",
            "Long shelf-life with secure protective tabs",
          ],
        },
        "ear-impression": {
          name: "Ear Impression",
          description: "High-precision silicone impression materials and accessories for capturing exact ear canal geometry.",
          features: [
            "Skin-friendly, addition-curing silicone compounds",
            "Optimal viscosity and precise detail reproduction",
            "Double-cartridge systems and manual injectors",
            "Foam pads and protective ear lights",
          ],
        },
        "earmold-lab-equipment": {
          name: "Earmold Lab Equipment",
          description: "Professional equipment, light-curing chambers, and precision tools for hearing care earmold laboratories.",
          features: [
            "UV light-curing units for lacquering and building",
            "Earmold grinders, milling cutters, and polishing units",
            "Vacuum mixing systems for bubbles-free results",
            "High-durability lab tools and accessories",
          ],
        },
        "cleaning-customer-care": {
          name: "Cleaning Customer Care",
          description: "Complete hygiene, drying systems, and sanitizing solutions designed for hearing instruments maintenance.",
          features: [
            "Electronic drying stations and dehumidifiers",
            "Antibacterial sprays and cleaning wipes",
            "Cleaning tablets and specialized effervescent formulas",
            "Air blowers and cerumen removal tools",
          ],
        },
        "audiological-equipment-accessoires": {
          name: "Audiological Equipment Accessoires",
          description: "Certified audiology testing accessories, transducers, headband components, and calibration tools.",
          features: [
            "Insert earphones and bone conduction transducers",
            "Replaceable ear cushions and acoustic coupling tips",
            "Audiometer cables and patient response switches",
            "Standard and custom sound insulation solutions",
          ],
        },
      },
    },
    cta: {
      badge: "Dedicated B2B Portals",
      title: "Optimize Your Acoustic Shop Inventory & Shipping",
      desc: "Access your dedicated account to manage standing B2B orders, check real-time battery stock volumes, and retrieve German logistics tracking tags instantly.",
      portalBtn: "Customer Login Portal",
      quoteBtn: "Contact Wholesale Desk",
      note: "Authorized business accounts only. Standard distributor terms apply. Minimum B2B checkout is €500.",
    },
    aboutUsPage: {
      badge: "Who We Are",
      title: "About Duraxx",
      desc: "A trusted European partner distributing certified hearing aid batteries, audiology materials, and lab accessories.",
      philosophy: "Philosophy",
      philosophyTitle: "Quality and Trust",
      philosophyDesc: "Duraxx is dedicated to providing high-quality power solutions and earmold laboratory materials directly to medical centers, acoustic retailers, and custom labs in Germany and across Europe.",
      distributorBadge: "Certified Wholesale Distributor",
      logisticsBadge: "Global Logistics Integrations",
      sections: {
        "Contact Person": {
          title: "Contact Person",
          content: "Get in contact with us by E-Mail or phone during our business hours. Our team is ready to listen to your requests and suggestions. Our goal is to make our customers as happy as possible. With the high competence of our colleagues, we achieve high customer satisfaction and sustainable customer loyalty.",
        },
        "Logistic and Shipping": {
          title: "Logistic and Shipping",
          content: "Efficient logistics is the key to success! With an optimal warehouse structure, we ensure a fast and secure delivery of the ordered goods. We work with UPS, GLS, DPD, DB Schenker and the transportation company Kühne+Nagel.",
        },
        "Battery Wholesale": {
          title: "Battery Wholesale",
          content: "We are a distributor of VARTA Microbattery. In our range we have hearing aid batteries from Varta, Duracell, Powerone, and other well-known brands. Our target group ranges from resellers to industrial companies to representatives from all possible industries. Basically, we serve customers with a minimum order value of 500€.",
        },
        "Hearing Aid Accessories": {
          title: "Hearing Aid Accessories",
          content: "In addition to our hearing aid batteries, we also offer hearing aid accessories and equipment for acoustic shops.",
        },
        "Medical Products": {
          title: "Medical Products",
          content: "We are not only present in the hearing aid sector, also in the medical branch. We would be happy to present our further products in the medical sector. Our product range is very broad, from incontinence products to surgical aids in the operating room and medical devices in hospitals.",
        },
        "Payment": {
          title: "Payment",
          content: "You can pay by bank transfer to our bank account. We do not offer other payment options such as credit card or PayPal.",
        },
      },
    },
    productsPage: {
      badge: "Wholesale Catalog",
      title: "Our Products",
      desc: "High-durability audiology components, clinical hygiene, and zinc-air cells for professional suppliers.",
      sidebarTitle: "Jump to Category",
      sideBoxTitle: "B2B Volume Deals?",
      sideBoxDesc: "Contact our sales desk for custom quotes on container-load battery shipments or full laboratory refits.",
      sideBoxBtn: "Request Quotation",
      techAdvantage: "Technical Advancements",
      wholesaleModels: "Distributed Wholesale Models",
      orderPortalNote: "Ready to place order requests for these items? Use our B2B ordering portal.",
      orderPortalBtn: "Order in Portal",
      sampleCatalog: {
        batteries: [
          "VARTA Comfort Size 10 Zinc-Air (Yellow tab)",
          "VARTA Comfort Size 312 Zinc-Air (Brown tab)",
          "VARTA Comfort Size 13 Zinc-Air (Orange tab)",
          "VARTA Comfort Size 675 Zinc-Air (Blue tab)",
          "Powerone Mercury-Free Hearing Aid Cells (Sizes 10, 13, 312, 675)",
          "Duracell Active Air Heavy Duty Wholesale Packs",
        ],
        "ear-impression": [
          "Detax Addition-Curing Ear Impression Silicones (2-component)",
          "Detax Mixing Tips and Dispensing Cartridges",
          "Precision Impression Syringes & Cartridge Injector Guns",
          "Cotton and Foam Ear Canal Protection Pads",
          "LED Otoscopes & Custom Ear Examination Lights",
        ],
        "earmold-lab-equipment": [
          "UV Light-Curing Chambers for Earmold Modeling & Lacquering",
          "High-Precision Laboratory Micromotors and Milling Burs",
          "Vacuum Silcone Mixing Units (Bubble-Free Compounding)",
          "Earmold Polishing Kits and Surface Treatment Solutions",
          "Laboratory Dust Extraction & Ventilation Systems",
        ],
        "cleaning-customer-care": [
          "Electronic Dehumidifiers and UV-C Sanitizing Chambers",
          "Audiologist Spray Cleaners & Disinfectant Wipes",
          "Effervescent Cleaning Tablets for Earmolds",
          "Air Blowers (Bulb pumps) and Cerumen Extraction Tools",
          "Drying Beakers & Silica Gel Moisture Absorption Capsules",
        ],
        "audiological-equipment-accessoires": [
          "Insert Earphones (3A/5A Calibrated Transducers)",
          "Bone Conduction Vibrators & Elastic Headbands",
          "Audiometer Connection Cables and Patient Response Buttons",
          "Soundproof Booth Accessories & Coupler Adapters",
          "Disposable Ear Tips & Impedance Probe Sleeves",
        ],
      },
    },
    contactPage: {
      badge: "Connect With Us",
      title: "Contact & Support",
      desc: "Get in touch with our commercial sales desk to establish a business account or request custom pricing.",
      hqTitle: "Duraxx HQ Germany",
      addressLabel: "Corporate Address",
      emailLabel: "Direct Email",
      phoneLabel: "Phone Support",
      hoursLabel: "Business Hours",
      hoursValue: "Monday — Friday: 08:30 - 17:00",
      cetLabel: "Central European Time (CET)",
      mapTag: "Mettmann / Düsseldorf Region",
      mapTitle: "Industrial Hub Germany",
      mapDesc: "Our central logistics terminal is located near Düsseldorf, ensuring accelerated transit times across the European transport corridors.",
      successTitle: "Inquiry Received!",
      successDesc: "Thank you. Your B2B request has been sent to our sales desk. A commercial representative will follow up via email within 1 business day.",
      formTitle: "Commercial Inquiry Desk",
      formDesc: "Register as a wholesale B2B client or request custom bulk shipping tariffs.",
      firstName: "First Name",
      lastName: "Last Name",
      companyName: "Company Name",
      vatId: "VAT / Tax ID",
      email: "Work Email",
      phone: "Phone Number",
      interest: "Segment of Interest",
      message: "Inquiry Message",
      messagePlaceholder: "Please outline your estimated annual order volume or laboratory specification needs.",
      submitBtn: "Submit B2B Inquiry",
      interests: {
        batteries: "Hearing Aid Batteries",
        impression: "Ear Impression Silicones",
        lab: "Earmold Laboratory Equipment",
        hygiene: "Hygiene & Cleaning Care",
        audiology: "Audiological Accessories",
      },
    },
    videosPage: {
      badge: "Media Library",
      title: "Videos & Walkthroughs",
      desc: "Explore our video library featuring product guides, equipment setup instructions, and clinical audiology tutorials.",
      walkthrough: "Interactive Walkthrough",
      list: [
        {
          title: "VARTA Comfort Premium Production Line",
          category: "Production",
          description: "Go behind the scenes of high-precision German battery production and quality testing facilities.",
        },
        {
          title: "Detax Ear Impression Silicone Application",
          category: "Tutorial",
          description: "Step-by-step clinical walkthrough showing correct silicone preparation, otoscopy, and syringe technique.",
        },
        {
          title: "Earmold Lab Light-Curing Chamber Calibration",
          category: "Equipment",
          description: "Detailed calibration and light frequency setup guide for UV lab units to ensure bubble-free earmold lacquering.",
        },
      ],
    },
  },
  DE: {
    header: {
      aboutUs: "Über uns",
      products: "Produkte",
      videos: "Videos",
      contact: "Kontakt",
      login: "Kunden-Login",
      categories: "Kategorien",
      langLabel: "Sprache",
    },
    footer: {
      description: "Erstklassiger Großhandels-Distributor für weltbekannte Hörgerätebatterien und spezialisiertes Otoplastik-Laborzubehör. Verpflichtet zu Qualität, Zuverlässigkeit und B2B-Exzellenz.",
      contactUs: "Kontaktieren Sie uns",
      quickLinks: "Schnelllinks",
      infoDE: "Informationen",
      copyright: "Duraxx GmbH. Alle Rechte vorbehalten.",
      designedBy: "Entworfen von",
      address: "Auf dem Hüls 12\n40822 Mettmann / Deutschland",
    },
    hero: {
      distributorBadge: "Offizieller Großhandelspartner & Distributor",
      mainTitle: "Zuverlässige Energie für",
      sloganTitle: "Hörsysteme",
      paragraph: "Wir vertreiben erstklassige Zink-Luft-Mikrobatterien und Otoplastik-Laborausstattungen direkt an Akustiker, Kliniken und Wiederverkäufer in ganz Europa.",
      germanQuality: "100% Deutsche Qualität",
      expressLogistics: "Express-B2B-Logistik",
      quoteBtn: "B2B-Angebot anfordern",
      portalBtn: "Zum Portal",
      size: "Größe",
      color: "Farbe",
      standardColor: "Standard-Farbcode",
      bestApp: "Beste Anwendung",
      voltage: "Spannung",
      tech: "Technologie",
      system: "System",
      powerCell: "Zink-Luft-Powerzelle",
      batteries: {
        "10": {
          name: "Zink-Luft-Powerzelle Größe 10",
          color: "Gelb",
          description: "Ultrakompakte Zink-Luft-Batterie, entwickelt für kleine CIC- (Completely-in-Canal) und Mini-RIC-Hörgeräte (Receiver-in-Canal).",
          bestFor: "CIC- und Mini-RIC-Hörgeräte",
        },
        "312": {
          name: "Zink-Luft-Powerzelle Größe 312",
          color: "Braun",
          description: "Die beliebteste Hörgerätebatteriegröße, die ein perfektes Verhältnis von kompakten Abmessungen und zuverlässiger, langlebiger Energiekapazität bietet.",
          bestFor: "RIC- und Mikro-BTE-Hörgeräte",
        },
        "13": {
          name: "Zink-Luft-Powerzelle Größe 13",
          color: "Orange",
          description: "Hochleistungs-Energiezelle, entwickelt für Hinter-dem-Ohr- (BTE) und In-dem-Ohr-Hörsysteme (ITE), die eine stabile Spannung unter Last erfordern.",
          bestFor: "BTE- und ITE-Geräte",
        },
        "675": {
          name: "Zink-Luft-Powerzelle Größe 675",
          color: "Blau",
          description: "Hochleistungs-Energiequelle, optimiert für leistungsstarke Hinter-dem-Ohr-Hörgeräte (BTE) und Cochlea-Implantat-Prozessoren.",
          bestFor: "Hochleistungs-BTE-Geräte & Cochlea-Implantate",
        },
      },
    },
    stats: {
      experience: {
        label: "Jahre Erfahrung",
        desc: "Tiefes Otoplastik-Fachwissen & zuverlässige Partnerschaften seit unserer Gründung.",
      },
      brands: {
        label: "Verifizierte Marken",
        desc: "Offizieller Großhandels-Distributor für Varta, Detax, Duracell, Powerone.",
      },
      clients: {
        label: "Aktive B2B-Kunden",
        desc: "Belieferung von Akustiker-Fachgeschäften, Laboren und Händlern in ganz Deutschland.",
      },
      order: {
        value: "500€",
        label: "Mindestbestellwert",
        desc: "Optimierte Logistik, speziell zugeschnitten auf gewerbliche Großhandelsmengen.",
      },
    },
    categoriesSection: {
      badge: "B2B-Produktsortiment",
      title: "Unsere Kernbereiche",
      desc: "Von erstklassigen Zink-Luft-Zellen bis hin zu fortschrittlichen Abformsilikonen und Otoplastik-Laborsystemen beliefern wir Akustikbetriebe mit allem Nötigen für den Alltag.",
      action: "Katalog erkunden",
      segment: "Segment",
      list: {
        batteries: {
          name: "Batterien",
          description: "Erstklassige Zink-Luft-Hörgerätebatterien mit stabiler Spannung und langer Lebensdauer für alle digitalen und analogen Hörsysteme.",
          features: [
            "Stabiler Spannungsverlauf für glasklare Klangverstärkung",
            "Quecksilberfreie, kapazitätsstarke Zink-Luft-Technologie",
            "Größen: 10 (Gelb), 312 (Braun), 13 (Orange), 675 (Blau)",
            "Lange Lagerfähigkeit mit sicheren Schutzlaschen",
          ],
        },
        "ear-impression": {
          name: "Ohrabformung",
          description: "Hochpräzise Silikon-Abformmaterialien und Zubehör zur exakten Erfassung der Gehörgangsgeometrie.",
          features: [
            "Hautfreundliche, additionsvernetzende Silikonkomponenten",
            "Optimale Viskosität und detailgetreue Wiedergabe",
            "Doppelkartuschen-Systeme und manuelle Injektoren",
            "Schaumstoff-Pads und schützende Gehörgangs-Leuchten",
          ],
        },
        "earmold-lab-equipment": {
          name: "Laborausstattung",
          description: "Professionelle Geräte, Lichtpolymerisationskammern und Präzisionswerkzeuge für Otoplastik-Labore.",
          features: [
            "UV-Lichthärtungsgeräte zum Lackieren und Aufbauen",
            "Schleifgeräte, Fräser und Poliermaschinen für Labore",
            "Vakuum-Mischsysteme für blasenfreie Ergebnisse",
            "Robuste Laborwerkzeuge und Zubehörteile",
          ],
        },
        "cleaning-customer-care": {
          name: "Reinigung & Pflege",
          description: "Vollständige Hygiene-, Trocknungs- und Desinfektionslösungen für die Pflege von Hörsystemen.",
          features: [
            "Elektronische Trockenstationen und Entfeuchter",
            "Antibakterielle Sprays und Reinigungstücher",
            "Reinigungstabletten mit spezieller Brauseformel",
            "Pustebälle und Werkzeuge zur Cerumen-Entfernung",
          ],
        },
        "audiological-equipment-accessoires": {
          name: "Audiologie-Zubehör",
          description: "Zertifiziertes Zubehör für audiologische Tests, Wandler, Kopfbügelkomponenten und Kalibrierwerkzeuge.",
          features: [
            "Einsteckhörer und Knochenleitungshörer",
            "Austauschbare Ohrpolster und akustische Kupplungen",
            "Audiometerkabel und Patientenantworttasten",
            "Standard- und maßgeschneiderte Schallschutzlösungen",
          ],
        },
      },
    },
    cta: {
      badge: "Exklusive B2B-Portale",
      title: "Optimieren Sie Ihren Akustiker-Bestand & Versand",
      desc: "Melden Sie sich in Ihrem B2B-Kundenkonto an, um laufende Bestellungen zu verwalten, Lagerbestände einzusehen und Sendungsverfolgungen abzurufen.",
      portalBtn: "Kunden-Login Portal",
      quoteBtn: "Großhandels-Anfrage senden",
      note: "Nur für verifizierte Geschäftskunden. Es gelten die allgemeinen Lieferbedingungen des Großhandels. Mindestbestellwert beträgt 500 €.",
    },
    aboutUsPage: {
      badge: "Wer wir sind",
      title: "Über Duraxx",
      desc: "Ein zuverlässiger europäischer Partner für den Vertrieb zertifizierter Hörgerätebatterien, Abformmaterialien und Laborzubehör.",
      philosophy: "Philosophie",
      philosophyTitle: "Qualität und Vertrauen",
      philosophyDesc: "Duraxx widmet sich der direkten Versorgung von medizinischen Zentren, Akustiker-Fachgeschäften und Otoplastik-Laboren in Deutschland und ganz Europa mit hochwertigen Energielösungen und Laborbedarf.",
      distributorBadge: "Zertifizierter Großhandels-Distributor",
      logisticsBadge: "Globale Logistik-Anbindungen",
      sections: {
        "Contact Person": {
          title: "Ansprechpartner",
          content: "Kontaktieren Sie uns während unserer Geschäftszeiten per E-Mail oder Telefon. Unser Team nimmt Ihre Anfragen und Vorschläge gerne entgegen. Unser Ziel ist höchste Kundenzufriedenheit und eine langfristige Kundenbindung durch hohe Fachkompetenz.",
        },
        "Logistic and Shipping": {
          title: "Logistik und Versand",
          content: "Effiziente Logistik ist der Schlüssel zum Erfolg! Mit einer optimalen Lagerstruktur gewährleisten wir eine schnelle und sichere Lieferung. Wir arbeiten mit UPS, GLS, DPD, DB Schenker und Kühne+Nagel zusammen.",
        },
        "Battery Wholesale": {
          title: "Batterie-Großhandel",
          content: "Wir sind Distributor für VARTA Microbattery. Unser Sortiment umfasst Hörgerätebatterien von Varta, Duracell, Powerone und anderen bekannten Marken. Wir beliefern Wiederverkäufer und Industrie ab einem Mindestbestellwert von 500 €.",
        },
        "Hearing Aid Accessories": {
          title: "Hörgeräte-Zubehör",
          content: "Zusätzlich zu unseren Hörgerätebatterien bieten wir auch passendes Zubehör und Ausstattungen für Akustikerbetriebe an.",
        },
        "Medical Products": {
          title: "Medizinprodukte",
          content: "Wir sind nicht nur in der Hörgeräteakustik, sondern auch im medizinischen Sektor tätig. Unser Spektrum reicht von Inkontinenzprodukten bis hin zu chirurgischen Hilfsmitteln für den OP-Bedarf und Krankenhäuser.",
        },
        "Payment": {
          title: "Zahlungsbedingungen",
          content: "Die Zahlung erfolgt per Überweisung auf unser Bankkonto. Andere Zahlungsarten wie Kreditkarte oder PayPal bieten wir nicht an.",
        },
      },
    },
    productsPage: {
      badge: "Großhandels-Katalog",
      title: "Unsere Produkte",
      desc: "Langlebige audiologische Komponenten, klinische Hygiene und Zink-Luft-Zellen für professionelle Anbieter.",
      sidebarTitle: "Kategorie auswählen",
      sideBoxTitle: "Mengenrabatte?",
      sideBoxDesc: "Kontaktieren Sie unseren Vertrieb für individuelle Angebote bei palettenweisen Lieferungen oder Labor-Vollausstattungen.",
      sideBoxBtn: "Angebot anfordern",
      techAdvantage: "Technische Vorteile",
      wholesaleModels: "Vertriebene Großhandelsmodelle",
      orderPortalNote: "Möchten Sie eine Bestellung für diese Artikel aufgeben? Nutzen Sie unser B2B-Bestellportal.",
      orderPortalBtn: "Im Portal bestellen",
      sampleCatalog: {
        batteries: [
          "VARTA Comfort Größe 10 Zink-Luft (Gelbe Lasche)",
          "VARTA Comfort Größe 312 Zink-Luft (Braune Lasche)",
          "VARTA Comfort Größe 13 Zink-Luft (Orange Lasche)",
          "VARTA Comfort Größe 675 Zink-Luft (Blaue Lasche)",
          "Powerone quecksilberfreie Qualitätszellen (Größen 10, 13, 312, 675)",
          "Duracell Active Air Großhandels-Sammelpackungen",
        ],
        "ear-impression": [
          "Detax additionsvernetzende Ohrabformsilikone (2-Komponenten)",
          "Detax Mischkanülen und Doppelkartuschen",
          "Präzise Abformspritzen und Kartuschen-Injektionspistolen",
          "Watte- und Schaumstoff-Gehörgangsschutzpads",
          "LED-Otoskope & medizinische Untersuchungsleuchten",
        ],
        "earmold-lab-equipment": [
          "UV-Lichthärtungsboxen für Otoplastik-Modellation & Lackierung",
          "Präzisions-Labormikromotoren und Frässtifte",
          "Vakuum-Silikonmischgeräte (für blasenfreies Anrühren)",
          "Poliersets und Oberflächenbehandlungen für Otoplastiken",
          "Labor-Absauganlagen & Staubfiltervorrichtungen",
        ],
        "cleaning-customer-care": [
          "Elektronische Trockenkapseln und UV-C-Entfeuchtungsgeräte",
          "Sprühdesinfektion für Hörgeräte und Reinigungstücher",
          "Reinigungs-Brausetabletten für Schallschläuche & Ohrpassstücke",
          "Pustebälle und Werkzeuge zur Cerumenentfernung",
          "Trockenbecher und Silikagel-Trockenkapseln",
        ],
        "audiological-equipment-accessoires": [
          "Einsteckhörer (Kalibrierte Wandler 3A/5A)",
          "Knochenleitungshörer & elastische Kopfbügel",
          "Audiometer-Verbindungskabel und Patienten-Antworttasten",
          "Zubehör für Hörkabinen & Kupplungs-Messadapter",
          "Einweg-Ohrstöpsel & Sonden-Messhülsen",
        ],
      },
    },
    contactPage: {
      badge: "Kontaktieren Sie uns",
      title: "Kontakt & Support",
      desc: "Nehmen Sie Kontakt mit unserem Vertrieb auf, um ein Händlerkonto einzurichten oder Preise abzufragen.",
      hqTitle: "Duraxx Zentrale Deutschland",
      addressLabel: "Firmensitz",
      emailLabel: "Direkt-E-Mail",
      phoneLabel: "Telefon-Support",
      hoursLabel: "Geschäftszeiten",
      hoursValue: "Montag — Freitag: 08:30 - 17:00 Uhr",
      cetLabel: "Mitteleuropäische Zeit (MEZ)",
      mapTag: "Region Mettmann / Düsseldorf",
      mapTitle: "Wirtschaftsstandort Deutschland",
      mapDesc: "Unser Logistikterminal in Mettmann bei Düsseldorf sichert kürzeste Transportwege innerhalb des europäischen Verkehrsnetzes.",
      successTitle: "Anfrage übermittelt!",
      successDesc: "Vielen Dank. Ihre B2B-Anfrage wurde an den Vertrieb übermittelt. Ein Mitarbeiter wird sich innerhalb eines Werktags per E-Mail bei Ihnen melden.",
      formTitle: "Großhandels-Anfrageformular",
      formDesc: "Registrieren Sie sich als B2B-Kunde oder erfragen Sie Frachttarife für Großbestellungen.",
      firstName: "Vorname",
      lastName: "Nachname",
      companyName: "Firmenname",
      vatId: "USt-IdNr. (VAT ID)",
      email: "Geschäftliche E-Mail",
      phone: "Telefonnummer",
      interest: "Gewünschtes Segment",
      message: "Ihre Nachricht",
      messagePlaceholder: "Bitte beschreiben Sie Ihren ungefähren Jahresbedarf oder die Laboranforderungen.",
      submitBtn: "Anfrage absenden",
      interests: {
        batteries: "Hörgerätebatterien",
        impression: "Ohrabform-Silikone",
        lab: "Obergurt- & Laborgeräte",
        hygiene: "Reinigung & Pflege",
        audiology: "Audiologie-Zubehör",
      },
    },
    videosPage: {
      badge: "Mediathek",
      title: "Videos & Anleitungen",
      desc: "Entdecken Sie nützliche Video-Tutorials zu Produktanwendungen, Laboraufbauten und klinischen Obergurt-Richtlinien.",
      walkthrough: "Interaktive Anleitung",
      list: [
        {
          title: "VARTA Comfort Premium-Produktionslinie",
          category: "Produktion",
          description: "Erhalten Sie Einblicke in die hochpräzise deutsche Batterieherstellung und Qualitätssicherung.",
        },
        {
          title: "Detax Silikon-Abformung am Gehörgang",
          category: "Anleitung",
          description: "Schritt-für-Schritt-Video zur Vorbereitung des Abformmaterials, Otoskopie und Injektionstechnik.",
        },
        {
          title: "Kalibrierung von UV-Polymerisationskammern",
          category: "Laborausstattung",
          description: "Detaillierte Anleitung zur Frequenzeinstellung von Labor-Lichthärtern für blasenfreie Lackierungen.",
        },
      ],
    },
  },
};
