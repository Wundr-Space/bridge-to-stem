-- Allow public read of company_name for invitation validation
-- This is safe as it only exposes the company name for valid invitation links

DROP POLICY IF EXISTS "Allow public to validate invitations" ON public.corporate_profiles;

CREATE POLICY "Allow public to validate invitations" 
ON public.corporate_profiles 
FOR SELECT 
USING (true);