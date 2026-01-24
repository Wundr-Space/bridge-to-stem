-- Create pending_schools table for schools added by mentors but not yet registered
CREATE TABLE public.pending_schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_name TEXT NOT NULL,
  corporate_id UUID REFERENCES public.corporate_profiles(id) ON DELETE CASCADE,
  created_by_mentor_id UUID REFERENCES public.mentor_profiles(id) ON DELETE SET NULL,
  invited_email TEXT,
  invited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add school_id to mentor_profiles to link mentors to their associated school
ALTER TABLE public.mentor_profiles 
ADD COLUMN school_id UUID REFERENCES public.school_profiles(id) ON DELETE SET NULL;

-- Add pending_school_id to mentor_profiles for unregistered schools
ALTER TABLE public.mentor_profiles 
ADD COLUMN pending_school_id UUID REFERENCES public.pending_schools(id) ON DELETE SET NULL;

-- Enable RLS on pending_schools
ALTER TABLE public.pending_schools ENABLE ROW LEVEL SECURITY;

-- Allow corporates to view pending schools linked to them
CREATE POLICY "Corporates can view linked pending schools" 
ON public.pending_schools 
FOR SELECT 
USING (corporate_id IN (
  SELECT id FROM corporate_profiles WHERE user_id = auth.uid()
));

-- Allow mentors to create pending schools (when signing up via invitation)
CREATE POLICY "Anyone can create pending schools during signup" 
ON public.pending_schools 
FOR INSERT 
WITH CHECK (true);

-- Allow corporates to update pending schools (for invites)
CREATE POLICY "Corporates can update linked pending schools" 
ON public.pending_schools 
FOR UPDATE 
USING (corporate_id IN (
  SELECT id FROM corporate_profiles WHERE user_id = auth.uid()
));

-- Allow corporates to delete pending schools
CREATE POLICY "Corporates can delete linked pending schools" 
ON public.pending_schools 
FOR DELETE 
USING (corporate_id IN (
  SELECT id FROM corporate_profiles WHERE user_id = auth.uid()
));

-- Add trigger for updated_at
CREATE TRIGGER update_pending_schools_updated_at
BEFORE UPDATE ON public.pending_schools
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();