-- Supermem Waitlist Database Schema
-- Run this in your Supabase SQL Editor

-- Create waitlist_submissions table
CREATE TABLE IF NOT EXISTS waitlist_submissions (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    website TEXT,
    building_for TEXT,
    company_size TEXT,
    use_cases JSONB,
    other_use_case TEXT,
    from_source TEXT,  -- Ad tracking source (e.g., 'google', 'linkedin', 'twitter')
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_submissions(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_from_source ON waitlist_submissions(from_source);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist_submissions;
DROP POLICY IF EXISTS "Allow service role to read" ON waitlist_submissions;

-- Create policy to allow inserts (for your API)
CREATE POLICY "Allow public inserts" ON waitlist_submissions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy to allow your service to read all data
CREATE POLICY "Allow service role to read" ON waitlist_submissions
    FOR SELECT TO service_role
    USING (true);

-- Optional: Add a comment to the table
COMMENT ON TABLE waitlist_submissions IS 'Stores waitlist submissions for Supermem';

