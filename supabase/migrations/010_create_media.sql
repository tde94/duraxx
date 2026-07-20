-- Create media table
CREATE TABLE public.media (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('image', 'video', 'document')),
  category text NOT NULL,
  file_url text,
  external_url text,
  thumbnail_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on media" ON public.media
  FOR SELECT USING (true);

-- Allow authenticated users full access
CREATE POLICY "Allow full access to authenticated users on media" ON public.media
  FOR ALL USING (auth.role() = 'authenticated');

-- Create media-files storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-files', 'media-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media-files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media-files' );

CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'media-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media-files' 
  AND auth.role() = 'authenticated'
);
