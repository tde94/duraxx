-- Create partners table
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description_en TEXT,
    description_de TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on partners"
    ON public.partners FOR SELECT
    USING (true);

-- Allow authenticated users to manage partners
CREATE POLICY "Allow authenticated full access on partners"
    ON public.partners FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert initial partner data
INSERT INTO public.partners (name, description_en, description_de, is_active, display_order)
VALUES
('Varta', 'Premium German microbattery engineering, renowned for durability and peak voltage performance.', 'Erstklassige deutsche Mikrobatterie-Entwicklung, bekannt für Langlebigkeit und konstante Höchstspannung.', true, 1),
('Detax', 'Leading manufacturer of high-precision materials and silicones for audiology impression and earmold labs.', 'Führender Hersteller von hochpräzisen Abformmaterialien und Silikonen für Otoplastik-Labore.', true, 2),
('Duracell Active Air', 'Long-lasting power with extra long tabs for easy insertion and maximum comfort.', 'Langlebige Energie mit extralangen Laschen für einfaches Einsetzen und maximalen Komfort.', true, 3),
('Powerone', 'Eco-friendly, mercury-free batteries manufactured under strict quality standards in Germany.', 'Umweltfreundliche, quecksilberfreie Qualitätsbatterien hergestellt unter strengen Standards in Deutschland.', true, 4),
('Duraxx Hearing', 'Custom-tailored acoustic accessories and B2B audiology solutions.', 'Maßgeschneidertes Akustikzubehör und B2B-Lösungen für die Hörakustik.', true, 5);
