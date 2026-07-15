export interface CompanyInfo {
  name: string;
  slogan: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  email: string;
  phone: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  portalUrl: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
}

export interface PartnerBrand {
  name: string;
  logoUrl?: string;
  description: string;
}

export interface AboutSection {
  title: string;
  content: string;
}

export const companyInfo: CompanyInfo = {
  name: "Duraxx",
  slogan: "Quality and Trust",
  address: {
    street: "Auf dem Hüls 12",
    city: "40822 Mettmann",
    country: "Deutschland",
  },
  email: "info@duraxx.de",
  phone: "+49 (0) 2104 123456",
  socialLinks: {
    facebook: "https://facebook.com/duraxxgmbh",
    linkedin: "https://linkedin.com/company/duraxx-gmbh",
    instagram: "https://instagram.com/duraxxgmbh",
  },
  portalUrl: "/portal",
};

export const productCategories: ProductCategory[] = [
  {
    id: "batteries",
    name: "Batteries",
    slug: "batteries",
    description: "Premium zinc-air hearing aid batteries providing stable voltage and long lifetime for all digital and analog hearing systems.",
    features: [
      "Stable voltage level for clear sound amplification",
      "Mercury-free, high-capacity zinc-air technology",
      "Sizes: 10 (Yellow), 312 (Brown), 13 (Orange), 675 (Blue)",
      "Long shelf-life with secure protective tabs",
    ],
  },
  {
    id: "ear-impression",
    name: "Ear Impression",
    slug: "ear-impression",
    description: "High-precision silicone impression materials and accessories for capturing exact ear canal geometry.",
    features: [
      "Skin-friendly, addition-curing silicone compounds",
      "Optimal viscosity and precise detail reproduction",
      "Double-cartridge systems and manual injectors",
      "Foam pads and protective ear lights",
    ],
  },
  {
    id: "earmold-lab-equipment",
    name: "Earmold Lab Equipment",
    slug: "earmold-lab-equipment",
    description: "Professional equipment, light-curing chambers, and precision tools for hearing care earmold laboratories.",
    features: [
      "UV light-curing units for lacquering and building",
      "Earmold grinders, milling cutters, and polishing units",
      "Vacuum mixing systems for bubbles-free results",
      "High-durability lab tools and accessories",
    ],
  },
  {
    id: "cleaning-customer-care",
    name: "Cleaning Customer Care",
    slug: "cleaning-customer-care",
    description: "Complete hygiene, drying systems, and sanitizing solutions designed for hearing instruments maintenance.",
    features: [
      "Electronic drying stations and dehumidifiers",
      "Antibacterial sprays and cleaning wipes",
      "Cleaning tablets and specialized effervescent formulas",
      "Air blowers and cerumen removal tools",
    ],
  },
  {
    id: "audiological-equipment-accessoires",
    name: "Audiological Equipment Accessoires",
    slug: "audiological-equipment-accessoires",
    description: "Certified audiology testing accessories, transducers, headband components, and calibration tools.",
    features: [
      "Insert earphones and bone conduction transducers",
      "Replaceable ear cushions and acoustic coupling tips",
      "Audiometer cables and patient response switches",
      "Standard and custom sound insulation solutions",
    ],
  },
];

export const partnerBrands: PartnerBrand[] = [
  {
    name: "Varta",
    description: "Premium German microbattery engineering, renowned for durability and peak voltage performance.",
  },
  {
    name: "Detax",
    description: "Leading manufacturer of high-precision materials and silicones for audiology impression and earmold labs.",
  },
  {
    name: "Duracell Active Air",
    description: "Long-lasting power with extra long tabs for easy insertion and maximum comfort.",
  },
  {
    name: "Powerone",
    description: "Eco-friendly, mercury-free batteries manufactured under strict quality standards in Germany.",
  },
  {
    name: "Duraxx Hearing",
    description: "Custom-tailored acoustic accessories and B2B audiology solutions.",
  },
];

export const aboutSections: AboutSection[] = [
  {
    title: "Contact Person",
    content: "Get in contact with us by E-Mail or phone during our business hours. Our team is ready to listen to your requests and suggestions. Our goal is to make our customers as happy as possible. With the high competence of our colleagues, we achieve high customer satisfaction and sustainable customer loyalty.",
  },
  {
    title: "Logistic and Shipping",
    content: "Efficient logistics is the key to success! With an optimal warehouse structure, we ensure a fast and secure delivery of the ordered goods. We work with UPS, GLS, DPD, DB Schenker and the transportation company Kühne+Nagel.",
  },
  {
    title: "Battery Wholesale",
    content: "We are a distributor of VARTA Microbattery. In our range we have hearing aid batteries from Varta, Duracell, Powerone, and other well-known brands. Our target group ranges from resellers to industrial companies to representatives from all possible industries. Basically, we serve customers with a minimum order value of 500€.",
  },
  {
    title: "Hearing Aid Accessories",
    content: "In addition to our hearing aid batteries, we also offer hearing aid accessories and equipment for acoustic shops.",
  },
  {
    title: "Medical Products",
    content: "We are not only present in the hearing aid sector, also in the medical branch. We would be happy to present our further products in the medical sector. Our product range is very broad, from incontinence products to surgical aids in the operating room and medical devices in hospitals.",
  },
  {
    title: "Payment",
    content: "You can pay by bank transfer to our bank account. We do not offer other payment options such as credit card or PayPal.",
  },
];
