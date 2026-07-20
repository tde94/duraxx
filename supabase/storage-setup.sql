-- Create product-images bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Product images policies
CREATE POLICY "Product images are publicly accessible." ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images." ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images." ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images." ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'product-images');

-- Create announcement-images bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('announcement-images', 'announcement-images', true)
ON CONFLICT (id) DO NOTHING;

-- Announcement images policies
CREATE POLICY "Announcement images are publicly accessible." ON storage.objects
    FOR SELECT USING (bucket_id = 'announcement-images');

CREATE POLICY "Authenticated users can upload announcement images." ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'announcement-images');

CREATE POLICY "Authenticated users can update announcement images." ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'announcement-images');

CREATE POLICY "Authenticated users can delete announcement images." ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'announcement-images');
