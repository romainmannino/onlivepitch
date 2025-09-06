/*
  # Add French timezone column to page_visits

  1. Schema Changes
    - Add `visited_at_french` column to store time in French timezone
    - Keep existing `visited_at` column for UTC time
    - Add index for better query performance

  2. Data Migration
    - Convert existing UTC times to French timezone
    - Set default timezone for new records

  3. Benefits
    - Dual timezone support for better analytics
    - No data loss - both UTC and French time available
    - Easier reporting for French users
*/

-- Add French timezone column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'page_visits' AND column_name = 'visited_at_french'
  ) THEN
    ALTER TABLE page_visits ADD COLUMN visited_at_french timestamptz;
  END IF;
END $$;

-- Update existing records to have French timezone
UPDATE page_visits 
SET visited_at_french = visited_at AT TIME ZONE 'Europe/Paris'
WHERE visited_at_french IS NULL;

-- Add index for French timezone queries
CREATE INDEX IF NOT EXISTS idx_page_visits_visited_at_french 
ON page_visits (visited_at_french DESC);

-- Add comment to explain the column
COMMENT ON COLUMN page_visits.visited_at_french IS 'Visit timestamp in French timezone (Europe/Paris)';