-- Migration: contact_leads
-- Description: Lead capture table for contact form submissions

CREATE TABLE public.contact_leads (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  company          TEXT,
  service_interest TEXT,
  message          TEXT        NOT NULL,
  source_page      TEXT,
  status           TEXT        DEFAULT 'new'
                               CHECK (status IN ('new', 'contacted', 'proposal_sent', 'closed_won', 'closed_lost')),
  notes            TEXT
);

-- Indexes
CREATE INDEX idx_contact_leads_created_at ON public.contact_leads (created_at DESC);
CREATE INDEX idx_contact_leads_status     ON public.contact_leads (status);
CREATE INDEX idx_contact_leads_email      ON public.contact_leads (email);

-- Enable Row Level Security
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Public INSERT policy (form submissions)
CREATE POLICY "Allow public insert"
  ON public.contact_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- SELECT / UPDATE only via service_role (Supabase dashboard or server-side)
-- No policy needed: service_role bypasses RLS by default

-- Table comment
COMMENT ON TABLE public.contact_leads IS
  'Leads captured from the contact form at codetlon.com/contacto';
