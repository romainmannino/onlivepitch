/*
  # Create analytics tracking system

  1. New Tables
    - `page_visits`
      - `id` (uuid, primary key)
      - `url` (text, the visited URL)
      - `user_agent` (text, browser information)
      - `ip_address` (text, visitor IP)
      - `city` (text, visitor city)
      - `country` (text, visitor country)
      - `referrer` (text, where visitor came from)
      - `visited_at` (timestamp, when the visit occurred)
      - `session_id` (text, unique session identifier)

  2. Security
    - Enable RLS on `page_visits` table
    - Add policy for public read access (for analytics dashboard)
    - Add policy for public insert (to track visits)

  3. Indexes
    - Index on visited_at for time-based queries
    - Index on url for filtering by page
    - Index on session_id for unique visitor tracking
*/

CREATE TABLE IF NOT EXISTS page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  user_agent text,
  ip_address text,
  city text,
  country text,
  referrer text,
  visited_at timestamptz DEFAULT now(),
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert visit data (for tracking)
CREATE POLICY "Allow public insert for tracking"
  ON page_visits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading visit data (for analytics dashboard)
CREATE POLICY "Allow public read for analytics"
  ON page_visits
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_visits_visited_at ON page_visits (visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_visits_url ON page_visits (url);
CREATE INDEX IF NOT EXISTS idx_page_visits_session_id ON page_visits (session_id);
CREATE INDEX IF NOT EXISTS idx_page_visits_city ON page_visits (city);