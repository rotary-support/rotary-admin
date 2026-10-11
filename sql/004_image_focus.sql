-- =============================================================
-- 004 · Punto de enfoque de imágenes
-- Guarda qué parte de la imagen debe quedar visible cuando el sitio
-- la recorta (object-fit: cover). Formato CSS object-position: "X% Y%".
-- "50% 50%" = centro (comportamiento anterior).
-- =============================================================

alter table projects       add column if not exists image_focus text not null default '50% 50%';
alter table events         add column if not exists image_focus text not null default '50% 50%';
alter table news           add column if not exists image_focus text not null default '50% 50%';
alter table gallery_images add column if not exists image_focus text not null default '50% 50%';
alter table history_nodes  add column if not exists image_focus text not null default '50% 50%';
