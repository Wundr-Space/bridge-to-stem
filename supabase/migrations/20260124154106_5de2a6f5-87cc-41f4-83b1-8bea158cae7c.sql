-- Allow anyone to read school names for the mentor signup combobox
CREATE POLICY "Anyone can view school names for signup" 
ON public.school_profiles 
FOR SELECT 
USING (true);

-- Allow anyone to read pending school names for the mentor signup combobox
CREATE POLICY "Anyone can view pending school names for signup" 
ON public.pending_schools 
FOR SELECT 
USING (true);