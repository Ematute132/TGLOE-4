-- TGLOE Phase 1 schema
-- Run in the Supabase SQL editor. Assumes Supabase auth (auth.users) is enabled.

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  code text not null,          -- "CHEM 1A"
  name text not null,          -- "General Chemistry"
  color text default '#5FA8A0',
  syllabus_url text,           -- storage path to the uploaded syllabus PDF
  canvas_course_id text,       -- for Phase 2 Canvas sync
  created_at timestamptz default now()
);

create table if not exists calendar_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  course_id uuid references courses(id) on delete set null,
  title text not null,
  kind text check (kind in ('class','study','workout','meeting','task','other')) default 'other',
  location text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  source text default 'manual', -- 'manual' | 'hermes' | 'canvas' | 'google'
  created_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  course_id uuid references courses(id) on delete set null,
  title text not null,
  done boolean default false,
  due_at timestamptz,
  priority text check (priority in ('low','medium','high')) default 'medium',
  created_at timestamptz default now()
);

create table if not exists study_materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  course_id uuid references courses(id) on delete cascade not null,
  title text not null,
  kind text check (kind in ('note','doc','study_guide','practice_quiz','other')) default 'doc',
  storage_path text,           -- Supabase Storage path if a file was uploaded
  body text,                   -- for text notes
  created_at timestamptz default now()
);

-- Row Level Security: each user only sees their own rows.
alter table courses enable row level security;
alter table calendar_events enable row level security;
alter table tasks enable row level security;
alter table study_materials enable row level security;

create policy "owner access" on courses for all using (auth.uid() = user_id);
create policy "owner access" on calendar_events for all using (auth.uid() = user_id);
create policy "owner access" on tasks for all using (auth.uid() = user_id);
create policy "owner access" on study_materials for all using (auth.uid() = user_id);
