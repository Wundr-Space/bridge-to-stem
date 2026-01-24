-- Add additional columns to school_profiles table
ALTER TABLE public.school_profiles
ADD COLUMN IF NOT EXISTS school_type TEXT,
ADD COLUMN IF NOT EXISTS student_count TEXT,
ADD COLUMN IF NOT EXISTS contact_name TEXT,
ADD COLUMN IF NOT EXISTS contact_role TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;