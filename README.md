# Rotary Admin — CMS

Panel de administración de contenido para el sitio **Club Rotario de Mayagüez** (`rotary-home`).
React 19 + Vite + TypeScript + Supabase + Tailwind.

## Módulos
- **Proyectos** — CRUD, marca cuáles se muestran en el Home (`show_on_home`), orden e imagen.
- **Eventos** — CRUD por club (Rotary/Rotaract), fecha, lugar e imagen.
- **Noticias** — CRUD con resumen, contenido, imagen y fecha de publicación.
- **Galería** — sube imágenes con mensaje (caption) bilingüe.
- **Historia** — nodos del timeline (año, título, descripción, imagen, orden).
- **Mensajes** — textos principales editables de las páginas (hero, introducciones, contacto).
- **Usuarios** — administra quién accede al panel y su rol.

Todo el contenido es **bilingüe (ES/EN)** con doble campo por texto y un selector de **club** (Rotary / Rotaract).

## Desarrollo
```bash
cp .env.example .env   # rellena VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

## Base de datos
El esquema y el contenido inicial están en `sql/001_schema.sql` y `sql/002_seed.sql`.
Consulta la guía completa de despliegue en `../DEPLOY.md`.
