create extension if not exists pgcrypto;

create table public.startups (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  cohort_year text not null,
  display_number text not null,
  name text not null,
  category text not null,
  accent text not null,
  tags jsonb not null,
  description jsonb not null,
  tagline jsonb not null,
  segment jsonb not null,
  headline jsonb not null,
  paragraphs jsonb not null,
  features jsonb not null,
  socials jsonb not null default '{}'::jsonb,
  logo_url text,
  team_image_url text,
  is_published boolean not null default true,
  sort_order integer not null check (sort_order > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(tags) = 'object'),
  check (jsonb_typeof(description) = 'object'),
  check (jsonb_typeof(tagline) = 'object'),
  check (jsonb_typeof(segment) = 'object'),
  check (jsonb_typeof(headline) = 'object'),
  check (jsonb_typeof(paragraphs) = 'object'),
  check (jsonb_typeof(features) = 'object')
);

create table public.startup_members (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid not null references public.startups(id) on delete cascade,
  name text not null,
  role jsonb not null,
  image_url text,
  instagram text,
  github text,
  linkedin text,
  email text,
  sort_order integer not null check (sort_order > 0),
  created_at timestamptz not null default now(),
  check (jsonb_typeof(role) = 'object')
);

create index startups_public_order_idx on public.startups (is_published, cohort_year desc, sort_order);
create index startup_members_startup_order_idx on public.startup_members (startup_id, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger startups_set_updated_at
before update on public.startups
for each row execute function public.set_updated_at();

alter table public.startups enable row level security;
alter table public.startup_members enable row level security;

revoke all on public.startups from anon, authenticated;
revoke all on public.startup_members from anon, authenticated;
grant select on public.startups to anon, authenticated;
grant select on public.startup_members to anon, authenticated;

create policy "Published startups are publicly readable"
on public.startups for select
to anon, authenticated
using (is_published = true);

create policy "Members of published startups are publicly readable"
on public.startup_members for select
to anon, authenticated
using (
  exists (
    select 1
    from public.startups
    where startups.id = startup_members.startup_id
      and startups.is_published = true
  )
);

insert into storage.buckets (id, name, public)
values ('startup-assets', 'startup-assets', true)
on conflict (id) do update set public = excluded.public;

create policy "Startup assets are publicly readable"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'startup-assets');
