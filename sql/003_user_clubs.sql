-- =============================================================
-- MIGRACIÓN 003: Roles por club (rotary / rotaract)
-- Ejecutar en el SQL Editor DESPUÉS de 001 (y 002 si lo usaste).
-- No borra datos. El/los admin existentes quedan como club='rotary'
-- (super admin) por el default.
--
-- Modelo:
--   Rotary  admin        → super admin: todo, ambos clubes.
--   Rotaract admin       → todo, pero solo contenido de rotaract.
--   Rotary  collaborator → eventos, noticias e historia de rotary.
--   Rotaract collaborator→ eventos, noticias e historia de rotaract.
-- =============================================================

alter table admin_users
  add column if not exists club club_type not null default 'rotary';


create or replace function can_admin(target club_type) returns boolean as $$
  select exists (
    select 1 from admin_users u
    where u.id = auth.uid()
      and u.role = 'admin'
      and (u.club = 'rotary' or u.club = target)
  );
$$ language sql security definer stable;

-- ¿Puede escribir contenido de club=target en módulos permitidos
-- a colaboradores (eventos, noticias, historia)?
create or replace function can_staff(target club_type) returns boolean as $$
  select exists (
    select 1 from admin_users u
    where u.id = auth.uid()
      and (
        (u.role = 'admin' and (u.club = 'rotary' or u.club = target))
        or (u.role = 'collaborator' and u.club = target)
      )
  );
$$ language sql security definer stable;

-- PROJECTS (solo admin) ---------------------------------------
drop policy if exists "public read projects" on projects;
drop policy if exists "admin read projects" on projects;
drop policy if exists "admin write projects" on projects;
create policy "public read projects" on projects for select to anon, authenticated using (is_published = true);
create policy "staff read projects"  on projects for select to authenticated using (true);
create policy "write projects"       on projects for all    to authenticated using (can_admin(club)) with check (can_admin(club));

-- GALLERY (solo admin) ----------------------------------------
drop policy if exists "public read gallery" on gallery_images;
drop policy if exists "staff write gallery" on gallery_images;
create policy "public read gallery" on gallery_images for select to anon, authenticated using (true);
create policy "write gallery"       on gallery_images for all    to authenticated using (can_admin(club)) with check (can_admin(club));

-- SITE CONTENT / MENSAJES (solo admin) ------------------------
drop policy if exists "public read content" on site_content;
drop policy if exists "admin write content" on site_content;
create policy "public read content" on site_content for select to anon, authenticated using (true);
create policy "write content"       on site_content for all    to authenticated using (can_admin(club)) with check (can_admin(club));

-- HISTORY (admin o colaborador) -------------------------------
drop policy if exists "public read history" on history_nodes;
drop policy if exists "admin write history" on history_nodes;
create policy "public read history" on history_nodes for select to anon, authenticated using (true);
create policy "write history"       on history_nodes for all    to authenticated using (can_staff(club)) with check (can_staff(club));

-- EVENTS (admin o colaborador) --------------------------------
drop policy if exists "public read events" on events;
drop policy if exists "staff read events" on events;
drop policy if exists "staff write events" on events;
create policy "public read events" on events for select to anon, authenticated using (is_published = true);
create policy "staff read events"  on events for select to authenticated using (true);
create policy "write events"       on events for all    to authenticated using (can_staff(club)) with check (can_staff(club));

-- NEWS (admin o colaborador) ----------------------------------
drop policy if exists "public read news" on news;
drop policy if exists "staff read news" on news;
drop policy if exists "staff write news" on news;
create policy "public read news" on news for select to anon, authenticated using (is_published = true);
create policy "staff read news"  on news for select to authenticated using (true);
create policy "write news"       on news for all    to authenticated using (can_staff(club)) with check (can_staff(club));

-- ADMIN USERS (admin, con alcance por club) -------------------
-- Rotary admin gestiona cualquier usuario; rotaract admin solo
-- usuarios de club='rotaract'.
drop policy if exists "read own admin row" on admin_users;
drop policy if exists "admin manage admins" on admin_users;
create policy "read admins"   on admin_users for select to authenticated using (id = auth.uid() or can_admin(club));
create policy "manage admins" on admin_users for all    to authenticated using (can_admin(club)) with check (can_admin(club));
