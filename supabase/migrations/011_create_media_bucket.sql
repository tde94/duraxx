-- Create media-files storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-files', 'media-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media-files
CREATE POLICY "media-files Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media-files' );

CREATE POLICY "media-files Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "media-files Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'media-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "media-files Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media-files' 
  AND auth.role() = 'authenticated'
);
