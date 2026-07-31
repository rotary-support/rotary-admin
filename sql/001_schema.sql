-- =============================================================
-- ROTARY MAYAGÜEZ - CMS Schema (fresh)
-- Pegar completo en el SQL Editor de Supabase.
-- Contenido bilingüe (ES/EN) para dos clubes: Rotary y Rotaract.
-- =============================================================

-- 1. EXTENSIONS -------------------------------------------------
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- 2. ENUM TYPES -------------------------------------------------
create type club_type  as enum ('rotary', 'rotaract');
create type admin_role as enum ('admin', 'collaborator');

-- 3. UPDATED_AT TRIGGER FUNCTION -------------------------------
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 4. ADMIN USERS (perfil ligado a Supabase Auth) ---------------
create table admin_users (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null unique,
  full_name  text,
  role       admin_role not null default 'collaborator',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. SITE CONTENT (mensajes principales editables) -------------
create table site_content (
  id         uuid primary key default gen_random_uuid(),
  club       club_type not null,
  key        text not null,
  value_es   text,
  value_en   text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (club, key)
);

-- 6. PROJECTS ---------------------------------------------------
create table projects (
  id             uuid primary key default gen_random_uuid(),
  club           club_type not null,
  title_es       text not null,
  title_en       text not null,
  description_es text,
  description_en text,
  image_path     text,
  show_on_home   boolean not null default false,
  sort_order     int not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 7. EVENTS -----------------------------------------------------
create table events (
  id             uuid primary key default gen_random_uuid(),
  club           club_type not null,
  title_es       text not null,
  title_en       text not null,
  description_es text,
  description_en text,
  event_date     date not null,
  event_time     text,
  location_es    text,
  location_en    text,
  image_path     text,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 8. NEWS -------------------------------------------------------
create table news (
  id            uuid primary key default gen_random_uuid(),
  club          club_type not null,
  title_es      text not null,
  title_en      text not null,
  excerpt_es    text,
  excerpt_en    text,
  content_es    text,
  content_en    text,
  image_path    text,
  published_at  date not null default now(),
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 9. GALLERY IMAGES ---------------------------------------------
create table gallery_images (
  id          uuid primary key default gen_random_uuid(),
  club        club_type not null,
  image_path  text not null,
  caption_es  text,
  caption_en  text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 10. HISTORY NODES (timeline) ---------------------------------
create table history_nodes (
  id             uuid primary key default gen_random_uuid(),
  club           club_type not null,
  year           text not null,
  title_es       text not null,
  title_en       text not null,
  description_es text,
  description_en text,
  image_path     text,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 11. INDEXES ---------------------------------------------------
create index idx_projects_home    on projects(club, show_on_home) where is_published;
create index idx_projects_sort    on projects(club, sort_order);
create index idx_events_date       on events(club, event_date);
create index idx_news_published    on news(club, is_published, published_at desc);
create index idx_gallery_sort      on gallery_images(club, sort_order);
create index idx_history_sort      on history_nodes(club, sort_order);

-- 12. UPDATED_AT TRIGGERS --------------------------------------
create trigger set_updated_at before update on admin_users     for each row execute function update_updated_at_column();
create trigger set_updated_at before update on site_content    for each row execute function update_updated_at_column();
create trigger set_updated_at before update on projects        for each row execute function update_updated_at_column();
create trigger set_updated_at before update on events          for each row execute function update_updated_at_column();
create trigger set_updated_at before update on news            for each row execute function update_updated_at_column();
create trigger set_updated_at before update on gallery_images  for each row execute function update_updated_at_column();
create trigger set_updated_at before update on history_nodes   for each row execute function update_updated_at_column();

-- 13. ROLE HELPERS (SECURITY DEFINER) --------------------------
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from admin_users
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

create or replace function is_admin_or_collaborator()
returns boolean as $$
  select exists (
    select 1 from admin_users
    where id = auth.uid()
  );
$$ language sql security definer stable;

-- 14. ROW LEVEL SECURITY ---------------------------------------
alter table admin_users     enable row level security;
alter table site_content    enable row level security;
alter table projects        enable row level security;
alter table events          enable row level security;
alter table news            enable row level security;
alter table gallery_images  enable row level security;
alter table history_nodes   enable row level security;

-- admin_users: cada admin lee su propia fila; solo admin gestiona.
create policy "read own admin row"  on admin_users for select to authenticated using (id = auth.uid() or is_admin());
create policy "admin manage admins" on admin_users for all    to authenticated using (is_admin()) with check (is_admin());

-- site_content: lectura pública, escritura solo admin.
create policy "public read content" on site_content for select to anon, authenticated using (true);
create policy "admin write content" on site_content for all    to authenticated using (is_admin()) with check (is_admin());

-- projects: lectura pública (solo publicados), escritura solo admin.
create policy "public read projects" on projects for select to anon, authenticated using (is_published = true);
create policy "admin read projects"  on projects for select to authenticated using (is_admin());
create policy "admin write projects" on projects for all    to authenticated using (is_admin()) with check (is_admin());

-- history_nodes: lectura pública, escritura solo admin.
create policy "public read history" on history_nodes for select to anon, authenticated using (true);
create policy "admin write history" on history_nodes for all    to authenticated using (is_admin()) with check (is_admin());

-- events: lectura pública (publicados), escritura admin o colaborador.
create policy "public read events"  on events for select to anon, authenticated using (is_published = true);
create policy "staff read events"   on events for select to authenticated using (is_admin_or_collaborator());
create policy "staff write events"  on events for all    to authenticated using (is_admin_or_collaborator()) with check (is_admin_or_collaborator());

-- news: lectura pública (publicadas), escritura admin o colaborador.
create policy "public read news"  on news for select to anon, authenticated using (is_published = true);
create policy "staff read news"   on news for select to authenticated using (is_admin_or_collaborator());
create policy "staff write news"  on news for all    to authenticated using (is_admin_or_collaborator()) with check (is_admin_or_collaborator());

-- gallery_images: lectura pública, escritura admin o colaborador.
create policy "public read gallery" on gallery_images for select to anon, authenticated using (true);
create policy "staff write gallery" on gallery_images for all    to authenticated using (is_admin_or_collaborator()) with check (is_admin_or_collaborator());

-- =============================================================
-- 15. STORAGE: bucket público 'media'
--     (Crear el bucket 'media' como público desde el panel, o:)
-- =============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');
create policy "staff upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and is_admin_or_collaborator());
create policy "staff update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and is_admin_or_collaborator());
create policy "staff delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and is_admin_or_collaborator());

-- =============================================================
-- 16. PRIMER ADMIN
-- Tras crear el usuario en Auth (Authentication > Users), ejecutar:
--   insert into admin_users (id, email, full_name, role)
--   values ('<AUTH_USER_UUID>', 'tu@correo.com', 'Tu Nombre', 'admin');
-- =============================================================
