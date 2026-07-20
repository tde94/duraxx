-- Add localized description columns
ALTER TABLE public.categories
ADD COLUMN IF NOT EXISTS description_en text,
ADD COLUMN IF NOT EXISTS description_de text;

-- Update categories with localized descriptions
UPDATE public.categories SET 
  description_en = 'High-performance hearing aid batteries from VARTA, Duracell, and Powerone, available in all standard sizes (10, 13, 312, 675).',
  description_de = 'Hochleistungs-Hörgerätebatterien von VARTA, Duracell und Powerone, erhältlich in allen Standardgrößen (10, 13, 312, 675).'
WHERE slug = 'batteries';

UPDATE public.categories SET 
  description_en = 'Professional ear impression materials for precise, comfortable custom-fit hearing solutions.',
  description_de = 'Professionelle Ohrabformmaterialien für präzise, komfortable und maßgeschneiderte Hörlösungen.'
WHERE slug = 'ear-impression';

UPDATE public.categories SET 
  description_en = 'Complete lab equipment for earmold production, built for reliability and precision.',
  description_de = 'Komplette Laborausstattung für die Otoplastikfertigung, ausgelegt auf Zuverlässigkeit und Präzision.'
WHERE slug = 'earmold-lab-equipment';

UPDATE public.categories SET 
  description_en = 'Cleaning and maintenance products to keep hearing aids performing at their best.',
  description_de = 'Reinigungs- und Pflegeprodukte, um die Leistung von Hörgeräten optimal zu erhalten.'
WHERE slug = 'cleaning-customer-care';

UPDATE public.categories SET 
  description_en = 'A wide range of accessories and equipment for acoustic shops and audiology professionals.',
  description_de = 'Ein breites Sortiment an Zubehör und Geräten für Akustikgeschäfte und Audiologen.'
WHERE slug IN ('audiological-equipment-accessoires', 'audiological-equipment-accessories');
