-- Run this SQL in your Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS public.demo_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT NOT NULL,
    industry TEXT NOT NULL,
    preferred_date TEXT,
    preferred_time TEXT,
    timezone TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new bookings
CREATE POLICY "Allow anonymous inserts for demo_bookings" 
ON public.demo_bookings 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Only allow authenticated users (like your service role or admins) to view bookings
CREATE POLICY "Allow authenticated users to read demo_bookings" 
ON public.demo_bookings 
FOR SELECT 
TO authenticated 
USING (true);
