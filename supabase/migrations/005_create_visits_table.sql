-- Create site_visits table
CREATE TABLE public.site_visits (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    path text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts so tracking works without login
CREATE POLICY "Allow anonymous inserts to site_visits" ON public.site_visits
    FOR INSERT TO anon WITH CHECK (true);
    
-- Optionally, allow authenticated admins to select
CREATE POLICY "Admins can view site_visits" ON public.site_visits
    FOR SELECT TO authenticated USING (true);
