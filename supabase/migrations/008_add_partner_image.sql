-- Add image_url column to partners table
ALTER TABLE public.partners
  ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create the storage bucket for partner images
INSERT INTO storage.buckets (id, name, public)
VALUES ('partner-images', 'partner-images', true)
ON CONFLICT (id) DO NOTHING;
