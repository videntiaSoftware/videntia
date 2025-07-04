-- Table for tracking email CTA click events for analytics
create table if not exists mail_click_events (
  id bigserial primary key,
  user_id uuid not null,
  card_name text not null,
  date_for date not null,
  referer text,
  ip text,
  user_agent text,
  clicked_at timestamptz not null default now(),
  campaign_id text,
  email_id text
);

-- Index for fast analytics by user/date
create index if not exists idx_mail_click_events_user_date on mail_click_events(user_id, date_for);
