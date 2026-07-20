-- Create categories table
CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    icon text,
    display_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id uuid REFERENCES public.categories(id) NOT NULL,
    name text NOT NULL,
    article_number text UNIQUE NOT NULL,
    description text,
    image_url text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories policies (Public Read, Admin only Write via service role or manual SQL)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

-- Products policies
CREATE POLICY "Active products are viewable by everyone" ON public.products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can insert products" ON public.products
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON public.products
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete products" ON public.products
    FOR DELETE TO authenticated USING (true);

-- Insert fixed categories
INSERT INTO public.categories (slug, title, icon, display_order) VALUES
    ('batteries', 'Batteries', 'battery', 1),
    ('ear-impression', 'Ear Impression', 'ear', 2),
    ('earmold-lab-equipment', 'Earmold Lab Equipment', 'microscope', 3),
    ('cleaning-customer-care', 'Cleaning Customer Care', 'sparkles', 4),
    ('audiological-equipment-accessoires', 'Audiological Equipment Accessoires', 'headphones', 5);
