-- Migration: Add from_source column for ad tracking
-- Run this if you already have the waitlist_submissions table

-- Add the from_source column
ALTER TABLE waitlist_submissions 
ADD COLUMN IF NOT EXISTS from_source TEXT;

-- Add index for from_source queries
CREATE INDEX IF NOT EXISTS idx_waitlist_from_source ON waitlist_submissions(from_source);

-- Comment the column
COMMENT ON COLUMN waitlist_submissions.from_source IS 'Traffic source for ad tracking (e.g., google, linkedin, twitter, facebook)';

-- Query to check distribution of traffic sources
-- SELECT from_source, COUNT(*) as count
-- FROM waitlist_submissions
-- WHERE from_source IS NOT NULL
-- GROUP BY from_source
-- ORDER BY count DESC;

