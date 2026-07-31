# Manual de Usuario — Rotary Admin (CMS)

Panel para administrar el contenido del sitio del **Club Rotario de Mayagüez**.

## 1. Acceso
Inicia sesión con tu correo y contraseña. Si no tienes cuenta, un administrador debe crearla
(en Supabase Authentication) y asignarte un rol en la sección **Usuarios**.

## 2. Roles y club
Cada usuario tiene un **club** (Rotary o Rotaract) y un **rol** (Administrador o Colaborador):

| Usuario | Qué puede hacer |
|---|---|
| **Rotary — Administrador** | Todo, en **ambos** clubes (super admin). |
| **Rotaract — Administrador** | Todo, pero **solo Rotaract**. |
| **Rotary — Colaborador** | Solo **Eventos, Noticias e Historia** de Rotary. |
| **Rotaract — Colaborador** | Solo **Eventos, Noticias e Historia** de Rotaract. |

Proyectos, Galería, Mensajes y Usuarios son solo para administradores. Quien no sea Rotary admin queda **fijado a su club** (el selector de club aparece bloqueado).

## 3. Idiomas
Cada texto tiene **dos campos: Español (ES) e Inglés (EN)**. Llena ambos para que el sitio
público muestre el idioma correcto según el visitante. Si dejas el inglés vacío, se usa el español.

## 4. Club
En cada sección elige el **club** (Rotary o Rotaract) con el selector superior; el contenido
se guarda y se muestra por separado para cada uno.

## 5. Módulos
- **Proyectos:** crea/edita/elimina. Activa **"Mostrar en el Home"** para que aparezca en la portada
  de Rotary (se muestran hasta 4, según el campo *Orden*).
- **Eventos:** define fecha, horario y lugar. En el Home de Rotary se listan los **próximos** (fecha
  futura) ordenados del más cercano al más lejano.
- **Noticias:** resumen, contenido, imagen y fecha de publicación. En el Home se muestran las **más
  recientes** primero.
- **Galería:** sube imágenes con un **mensaje** (caption) bilingüe. Usa *Orden* para ordenarlas.
- **Historia:** cada tarjeta del timeline es un **nodo** (año, título, descripción, imagen, orden).
- **Mensajes:** edita los textos fijos de las páginas (títulos, introducciones, contacto).
- **Usuarios:** agrega personas al panel (pegando su UUID de Supabase Auth) y define su rol.

## 6. Imágenes
Al subir una imagen se guarda en el almacenamiento de Supabase (bucket `media`) y se muestra
automáticamente en el sitio público.
