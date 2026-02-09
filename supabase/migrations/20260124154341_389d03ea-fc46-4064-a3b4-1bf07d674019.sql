-- Create a state school directory for lookup during signup
CREATE TABLE public.school_directory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.school_directory ENABLE ROW LEVEL SECURITY;

-- Anyone can read the school directory
CREATE POLICY "Anyone can read school directory" 
ON public.school_directory 
FOR SELECT 
USING (true);

-- Anyone can add schools during signup
CREATE POLICY "Anyone can add schools to directory" 
ON public.school_directory 
FOR INSERT 
WITH CHECK (true);

-- Drop the overly permissive SELECT policies on sensitive tables
DROP POLICY IF EXISTS "Anyone can view school names for signup" ON public.school_profiles;
DROP POLICY IF EXISTS "Anyone can view pending school names for signup" ON public.pending_schools;