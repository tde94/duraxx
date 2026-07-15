export interface ProductItem {
  name: string;
  image: string;
  description?: Record<"EN" | "DE", string>;
}

export interface ProductGroup {
  groupName: Record<"EN" | "DE", string>;
  items: ProductItem[];
}

export interface CategoryItem {
  id: string;
  slug: string;
  icon: string;
  titles: Record<"EN" | "DE", string>;
  shortLabels: Record<"EN" | "DE", string>;
  descriptions: Record<"EN" | "DE", string>;
  features: Record<"EN" | "DE", string[]>;
  groups: ProductGroup[];
}

export const categoriesList: CategoryItem[] = [
  {
    id: "batteries",
    slug: "batteries",
    icon: "batteries",
    titles: {
      EN: "Batteries",
      DE: "Batterien",
    },
    shortLabels: {
      EN: "Batteries",
      DE: "Batterien",
    },
    descriptions: {
      EN: "High-performance hearing aid batteries from VARTA, Duracell, and Powerone, available in all standard sizes (10, 13, 312, 675).",
      DE: "Hochleistungs-Hörgerätebatterien von VARTA, Duracell und Powerone, erhältlich in allen Standardgrößen (10, 13, 312, 675).",
    },
    features: {
      EN: [
        "VARTA Microbattery distributor",
        "Duracell Active Air range",
        "Powerone hearing aid batteries",
        "All standard sizes available",
        "Bulk wholesale pricing",
      ],
      DE: [
        "VARTA Microbattery Distributor",
        "Duracell Active Air Sortiment",
        "Powerone Hörgerätebatterien",
        "Alle Standardgrößen verfügbar",
        "Günstige Großhandelspreise",
      ],
    },
    groups: [
      {
        groupName: { EN: "Varta", DE: "Varta" },
        items: [
          { name: "Varta 10", image: "https://duraxx.de/wp-content/uploads/2022/12/varta-10-pil.jpg" },
          { name: "Varta 13", image: "https://duraxx.de/wp-content/uploads/2022/12/varta-13-pil.jpg" },
          { name: "Varta 312", image: "https://duraxx.de/wp-content/uploads/2022/12/varta-312-pil.jpg" },
          { name: "Varta 675", image: "https://duraxx.de/wp-content/uploads/2022/12/varta-675-pil.jpg" },
        ]
      },
      {
        groupName: { EN: "Duracell Active Air", DE: "Duracell Active Air" },
        items: [
          { name: "Duracell Actıvaır 10", image: "https://duraxx.de/wp-content/uploads/2023/02/duracell-10-numara-pil-01.jpg" },
          { name: "Duracell Actıvaır 13", image: "https://duraxx.de/wp-content/uploads/2023/02/duracell-13-numara-pil-01.jpg" },
          { name: "Duracell Actıvaır 312", image: "https://duraxx.de/wp-content/uploads/2023/02/duracell-312-numara-pil-01.jpg" },
          { name: "Duracell Actıvaır 675", image: "https://duraxx.de/wp-content/uploads/2023/02/duracell-675-numara-pil-01.jpg" },
        ]
      },
      {
        groupName: { EN: "Power one Evolution", DE: "Power one Evolution" },
        items: [
          { name: "Power one Evolution 10", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-10-pil.jpg" },
          { name: "Power one Evolution 13", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-13-pil.jpg" },
          { name: "Power one Evolution 312", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-312-pil.jpg" },
          { name: "Power one Evolution 675", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-675-pil.jpg" },
        ]
      },
      {
        groupName: { EN: "Power one", DE: "Power one" },
        items: [
          { name: "Power one 10", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-ex-10-pil.jpg" },
          { name: "Power one 13", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-ex-13-pil.jpg" },
          { name: "Power one 312", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-ex-312-pil.jpg" },
          { name: "Power one Implant 675", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-ex-675-pil.jpg" },
        ]
      },
      {
        groupName: { EN: "Ecopack", DE: "Ecopack" },
        items: [
          { name: "Ecopack 10", image: "https://duraxx.de/wp-content/uploads/2022/12/ecopack-10-pil.jpg" },
          { name: "Ecopack 13", image: "https://duraxx.de/wp-content/uploads/2022/12/ecopack-13-pil.jpg" },
          { name: "Ecopack 312", image: "https://duraxx.de/wp-content/uploads/2022/12/ecopack-312-pil.jpg" },
          { name: "Ecopack 675", image: "https://duraxx.de/wp-content/uploads/2022/12/ecopack-675-pil.jpg" },
        ]
      }
    ],
  },
  {
    id: "ear-impression",
    slug: "ear-impression",
    icon: "ear-impression",
    titles: {
      EN: "Ear Impression",
      DE: "Ohrabformung",
    },
    shortLabels: {
      EN: "Ear Impression",
      DE: "Ohrabformung",
    },
    descriptions: {
      EN: "Professional ear impression materials for precise, comfortable custom-fit hearing solutions.",
      DE: "Professionelle Ohrabformmaterialien für präzise, komfortable und maßgeschneiderte Hörlösungen.",
    },
    features: {
      EN: [
        "High-precision impression materials",
        "Comfortable for patients",
        "Consistent, reliable results",
        "Suitable for professional use",
      ],
      DE: [
        "Hochpräzise Abformmaterialien",
        "Komfortabel für Patienten",
        "Konsistente, zuverlässige Ergebnisse",
        "Für den professionellen Einsatz geeignet",
      ],
    },
    groups: [
      {
        groupName: { EN: "Impression Materials", DE: "Abformmaterialien" },
        items: [
          {
            name: "Green Eco",
            image: "https://duraxx.de/wp-content/uploads/2022/12/green-eco-106.jpg",
            description: { EN: "Putty – medium consistency.", DE: "Putty – mittlere Konsistenz." },
          },
          {
            name: "Pink Putty",
            image: "https://duraxx.de/wp-content/uploads/2022/12/pink-putty-369.jpg",
            description: { EN: "General-purpose putty.", DE: "Mehrzweck-Knetmaterial." },
          },
          {
            name: "Classic Futur",
            image: "https://duraxx.de/wp-content/uploads/2022/12/classic-futur-676.jpg",
            description: { EN: "Condensation curing ear impression material.", DE: "Kondensationsvernetzendes Ohrabformmaterial." },
          },
          {
            name: "Addition Rapid",
            image: "https://duraxx.de/wp-content/uploads/2022/12/addition-rapid-254.jpg",
            description: { EN: "A-silicone with visual setting check indicator.", DE: "A-Silikon mit optischer Abbindekontrolle." },
          },
          {
            name: "Addition Mini Junior",
            image: "https://duraxx.de/wp-content/uploads/2022/12/addition-mini-junior-263.jpg",
            description: { EN: "Precision ear impression silicone for children.", DE: "Präzisions-Ohrabformsilikon für Kinder." },
          },
          {
            name: "Detax Flextime ®",
            image: "https://duraxx.de/wp-content/uploads/2023/01/detax-flexitime.jpg",
            description: { EN: "Putty, innovative soft-consistency.", DE: "Knetmaterial, innovative Weichkonsistenz." },
          },
        ]
      },
      {
        groupName: { EN: "Equipment & Accessories", DE: "Geräte & Zubehör" },
        items: [
          { name: "Impression Syringe (Metal)", image: "https://duraxx.de/wp-content/uploads/2022/12/siringa-653.jpg" },
          { name: "Lighting Ear Stick", image: "https://duraxx.de/wp-content/uploads/2022/12/isikli-kulak-cubugu-968.jpg" },
          { name: "Impression Syringe (Plastic)", image: "https://duraxx.de/wp-content/uploads/2022/12/siringa-236.jpg" },
          { name: "Otoscope", image: "https://duraxx.de/wp-content/uploads/2022/12/otoskop-91.jpg" },
          { name: "Impression Pads Secure", image: "https://duraxx.de/wp-content/uploads/2022/12/impression-pads-secure-34.jpg" },
        ]
      }
    ],
  },
  {
    id: "earmold-lab-equipment",
    slug: "earmold-lab-equipment",
    icon: "earmold-lab-equipment",
    titles: {
      EN: "Earmold Lab Equipment",
      DE: "Laborausstattung",
    },
    shortLabels: {
      EN: "Lab Equipment",
      DE: "Laborgeräte",
    },
    descriptions: {
      EN: "Complete lab equipment for earmold production, built for reliability and precision.",
      DE: "Komplette Laborausstattung für die Otoplastikfertigung, ausgelegt auf Zuverlässigkeit und Präzision.",
    },
    features: {
      EN: [
        "Full earmold production line equipment",
        "Precision-built tools",
        "Reliable for daily lab use",
        "Support for acoustic shops",
      ],
      DE: [
        "Komplette Produktionslinien-Ausstattung",
        "Präzisionswerkzeuge",
        "Zuverlässig für den täglichen Laboreinsatz",
        "Unterstützung für Akustikgeschäfte",
      ],
    },
    groups: [
      {
        groupName: { EN: "Materials & Silicones", DE: "Materialien & Silikone" },
        items: [
          {
            name: "Earflex® Clear / Rose",
            image: "https://duraxx.de/wp-content/uploads/2022/12/earflex-clear-rose-302.jpg",
            description: { EN: "Earmould silicone.", DE: "Otoplastik-Silikon." },
          },
          {
            name: "Detax Softwear® 2.0",
            image: "https://duraxx.de/wp-content/uploads/2022/12/detax-softwear-20-583.jpg",
            description: { EN: "Permanently elastic earmould silicone.", DE: "Dauerelastisches Otoplastik-Silikon." },
          },
          {
            name: "Earflex ® Rainbow",
            image: "https://duraxx.de/wp-content/uploads/2022/12/earflex-rainbow.jpg",
            description: { EN: "Multicolor earmould silicone.", DE: "Mehrfarbiges Otoplastik-Silikon." },
          },
          {
            name: "Duglasil® Express",
            image: "https://duraxx.de/wp-content/uploads/2022/12/duglasil-duglasil-express-497.jpg",
            description: { EN: "Crystal-clear transparent casting silicone.", DE: "Glasklares, transparentes Gießsilikon." },
          },
          {
            name: "Aquaplus®",
            image: "https://duraxx.de/wp-content/uploads/2022/12/aquaplus-959.jpg",
            description: { EN: "Floatable special silicone.", DE: "Schwimmfähiges Spezial-Silikon." },
          },
          {
            name: "Bioplast",
            image: "https://duraxx.de/wp-content/uploads/2022/12/bioplast-509.jpg",
            description: { EN: "Medical grade earmould silicone.", DE: "Medizinisches Otoplastik-Silikon." },
          },
          {
            name: "Aquaplus® Colormix",
            image: "https://duraxx.de/wp-content/uploads/2022/12/aquaplus-colormix-117.jpg",
            description: { EN: "Floatable multicolor swim plug silicone.", DE: "Schwimmfähiges mehrfarbiges Gehörschutz-Silikon." },
          },
          {
            name: "Acrylon® Automix",
            image: "https://duraxx.de/wp-content/uploads/2022/12/acrylon-automix-486.jpg",
            description: { EN: "Urethane methacrylic earmould.", DE: "Urethan-Methacrylat-Otoplastik." },
          },
          {
            name: "Impression Lacquer",
            image: "https://duraxx.de/wp-content/uploads/2022/12/impression-lacquer-503.jpg",
            description: { EN: "One-component impression lacquer.", DE: "Einkomponenten-Abformlack." },
          },
          {
            name: "Microporlack",
            image: "https://duraxx.de/wp-content/uploads/2022/12/microporlack-560.jpg",
            description: { EN: "One component lacquer.", DE: "Einkomponenten-Lack." },
          },
          {
            name: "Luxaprint® Shellac Color",
            image: "https://duraxx.de/wp-content/uploads/2022/12/luxaprint-shellac-color-254.jpg",
            description: { EN: "Seals & permanently colours earmoulds.", DE: "Versiegelt und färbt Otoplastiken dauerhaft." },
          },
          {
            name: "Durosil®",
            image: "https://duraxx.de/wp-content/uploads/2022/12/durosil-765.jpg",
            description: { EN: "Duplicating silicone.", DE: "Dubliersilikon." },
          },
        ]
      },
      {
        groupName: { EN: "Lab Equipment", DE: "Laborgeräte & Zubehör" },
        items: [
          { name: "Pressure Pot", image: "https://duraxx.de/wp-content/uploads/2022/12/basinc-kabi-456.jpg" },
          { name: "UV Light Box", image: "https://duraxx.de/wp-content/uploads/2022/12/uv-lights-production-equipment-511.jpg" },
          { name: "Electric Turning Motor", image: "https://duraxx.de/wp-content/uploads/2022/12/electric-turning-motor-147.jpg" },
          { name: "Micro Motor", image: "https://duraxx.de/wp-content/uploads/2022/12/micro-motor-519.jpg" },
          { name: "Optima eN", image: "https://duraxx.de/wp-content/uploads/2022/12/optima-672.jpg" },
          { name: "Red Wax", image: "https://duraxx.de/wp-content/uploads/2022/12/red-wax-127.jpg" },
        ]
      },
      {
        groupName: { EN: "Precision Tools & Burs", DE: "Präzisionswerkzeuge & Bohrer" },
        items: [
          { name: "Conically-shaped Cutters", image: "https://duraxx.de/wp-content/uploads/2022/12/cutters-conically-shaped-508.jpg" },
          { name: "Pear-shaped Cutters", image: "https://duraxx.de/wp-content/uploads/2022/12/cutters-pear-shaped-717.jpg" },
          { name: "Tungsten Grinding Bur", image: "https://duraxx.de/wp-content/uploads/2022/12/tungsten-steel-grinding-198.jpg" },
          { name: "Soft Earmold Ball Burs", image: "https://duraxx.de/wp-content/uploads/2022/12/soft-earmold-ball-burs-866.jpg" },
          { name: "Soft Earmold Oval Burs", image: "https://duraxx.de/wp-content/uploads/2022/12/soft-earmold-oval-burs-242.jpg" },
          { name: "Conical Grinding Caps", image: "https://duraxx.de/wp-content/uploads/2022/12/conical-grinding-caps-36.jpg" },
          { name: "Soft Earmold Cutter", image: "https://duraxx.de/wp-content/uploads/2022/12/soft-earmold-cutter-system-969.jpg" },
          { name: "Finishing Stone for Resins", image: "https://duraxx.de/wp-content/uploads/2022/12/finishing-stone-for-resins-16.jpg" },
          { name: "Twist Drill", image: "https://duraxx.de/wp-content/uploads/2022/12/twist-drill-784.jpg" },
          { name: "Emery Ball Burs", image: "https://duraxx.de/wp-content/uploads/2022/12/emery-ball-burs-304.jpg" },
        ]
      }
    ],
  },
  {
    id: "cleaning-customer-care",
    slug: "cleaning-customer-care",
    icon: "cleaning-customer-care",
    titles: {
      EN: "Cleaning Customer Care",
      DE: "Reinigung & Pflege",
    },
    shortLabels: {
      EN: "Cleaning & Care",
      DE: "Pflege & Reinigung",
    },
    descriptions: {
      EN: "Cleaning and maintenance products to keep hearing aids performing at their best.",
      DE: "Reinigungs- und Pflegeprodukte, um die Leistung von Hörgeräten optimal zu erhalten.",
    },
    features: {
      EN: [
        "Daily cleaning products",
        "Maintenance kits",
        "Extends hearing aid lifespan",
        "Customer-friendly packaging",
      ],
      DE: [
        "Tägliche Reinigungsprodukte",
        "Pflegesets",
        "Verlängert die Lebensdauer von Hörgeräten",
        "Kundenfreundliche Verpackung",
      ],
    },
    groups: [
      {
        groupName: { EN: "Smartclean® Hygiene Range", DE: "Smartclean® Hygiene-Sortiment" },
        items: [
          {
            name: "Smartclean® Tabs",
            image: "https://duraxx.de/wp-content/uploads/2022/12/smartclean-tabs-362.jpg",
            description: { EN: "Sparkling cleaning tablets.", DE: "Brausetabletten zur Reinigung." },
          },
          {
            name: "Smartclean® Wipe",
            image: "https://duraxx.de/wp-content/uploads/2022/12/smartclean-wipe-76.jpg",
            description: { EN: "Moistened disinfection wipes.", DE: "Feuchte Desinfektionstücher." },
          },
          {
            name: "Smartbox \"Clean & Dry\"",
            image: "https://duraxx.de/wp-content/uploads/2022/12/smartbox-clean-dry-605.jpg",
            description: { EN: "Cleaning and drying cup.", DE: "Reinigungs- und Trockenbecher." },
          },
          {
            name: "Smartclean® Foam",
            image: "https://duraxx.de/wp-content/uploads/2022/12/smartclean-foam-351.jpg",
            description: { EN: "Hygienic foam cleaner.", DE: "Hygienischer Reinigungsschaum." },
          },
        ]
      }
    ],
  },
  {
    id: "audiological-equipment-accessoires",
    slug: "audiological-equipment-accessoires",
    icon: "audiological-equipment-accessories",
    titles: {
      EN: "Audiological Equipment Accessoires",
      DE: "Audiologie-Zubehör",
    },
    shortLabels: {
      EN: "Accessories",
      DE: "Zubehör",
    },
    descriptions: {
      EN: "A wide range of accessories and equipment for acoustic shops and audiology professionals.",
      DE: "Ein breites Sortiment an Zubehör und Geräten für Akustikgeschäfte und Audiologen.",
    },
    features: {
      EN: [
        "Wide accessory range",
        "For acoustic shops & professionals",
        "Complements full product line",
        "Ongoing new additions",
      ],
      DE: [
        "Breites Zubehörsortiment",
        "Für Akustiker & Fachleute",
        "Ergänzt die gesamte Produktlinie",
        "Laufend neue Erweiterungen",
      ],
    },
    groups: [
      {
        groupName: { EN: "Audiology Accessories", DE: "Audiologie-Zubehör" },
        items: [
          { name: "Soft Ear Tips", image: "https://duraxx.de/wp-content/uploads/2022/12/zeytin-prob-6.jpg" },
          { name: "İmpression Foam", image: "https://duraxx.de/wp-content/uploads/2022/12/soft-sponge-kulak-sungeri-178.jpg" },
          { name: "Moistureproof PVC Tubing", image: "https://duraxx.de/wp-content/uploads/2022/12/moistureproof-pvc-tubing-875.jpg" },
          { name: "Pre-Bent Tubing", image: "https://duraxx.de/wp-content/uploads/2022/12/hortum-637.jpg" },
          { name: "Battery Tester", image: "https://duraxx.de/wp-content/uploads/2023/02/powerone-pil-olcer-195.jpg" },
          { name: "Wax Guards", image: "https://duraxx.de/wp-content/uploads/2022/12/filtre-kanal-ici-925.jpg" },
          { name: "ProWax miniFit", image: "https://duraxx.de/wp-content/uploads/2023/02/prowax-minifit.jpg" },
          { name: "HF3 Filter", image: "https://duraxx.de/wp-content/uploads/2023/02/h3-filter.jpg" },
          { name: "HF4 Filter", image: "https://duraxx.de/wp-content/uploads/2023/02/hf4-filter.jpg" },
          { name: "Eartip", image: "https://duraxx.de/wp-content/uploads/2022/12/eartip-172.jpg" },
          { name: "Anatomisches Ohr Modell", image: "https://duraxx.de/wp-content/uploads/2022/12/kulak-maketi-507.jpg" },
        ]
      }
    ],
  },
];
