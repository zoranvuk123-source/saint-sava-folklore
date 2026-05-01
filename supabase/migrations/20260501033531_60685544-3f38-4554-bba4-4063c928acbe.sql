DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;

UPDATE storage.buckets SET public = false WHERE id = 'gallery-images';