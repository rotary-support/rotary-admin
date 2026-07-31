-- =============================================================
-- ROTARY MAYAGÜEZ - Seed con el contenido actual del sitio.
-- Las imágenes son URLs absolutas (Unsplash); el front las usa tal cual
-- (mediaUrl() deja pasar http/https y solo resuelve rutas de Storage).
-- =============================================================

-- ---------- SITE CONTENT (mensajes principales) ----------
insert into site_content (club, key, value_es, value_en) values
('rotary','hero.title','Dar de Sí antes de Pensar en Sí','Service Above Self'),
('rotary','hero.subtitle','Bienvenido al Club Rotario de Mayagüez. Dedicados al servicio comunitario, la integridad y fomentar la buena voluntad.','Welcome to the Rotary Club of Mayagüez. Dedicated to community service, integrity, and fostering goodwill.'),
('rotary','hero.cta','Descubre Nuestros Proyectos','Discover Our Projects'),
('rotary','hero.joinCta','Hazte Miembro','Become a Member'),
('rotary','history.subtitle','Un legado de servicio en Mayagüez.','A legacy of service in Mayagüez.'),
('rotary','history.title','Nuestra Historia','Our History'),
('rotary','history.content','El Club Rotario de Mayagüez ha sido un pilar fundamental en nuestra ciudad durante décadas. Compuesto por líderes cívicos, profesionales y voluntarios, dedicamos nuestro tiempo y recursos a resolver los retos más apremiantes de nuestra comunidad.','The Rotary Club of Mayagüez has been a fundamental pillar in our city for decades. Composed of civic leaders, professionals, and volunteers, we dedicate our time and resources to solving the most pressing challenges of our community.'),
('rotary','projects.title','Nuestros Proyectos','Our Projects'),
('rotary','projects.subtitle','Haciendo la diferencia en Mayagüez.','Making a difference in Mayagüez and beyond.'),
('rotary','events.title','Próximos Eventos','Upcoming Events'),
('rotary','events.subtitle','Acompáñanos en nuestras próximas actividades.','Join us in our upcoming activities.'),
('rotary','news.title','Últimas Noticias','Latest News'),
('rotary','news.subtitle','Mantente al día con nuestras iniciativas.','Stay updated with our latest initiatives.'),
('rotary','gallery.title','Galería de Fotos','Photo Gallery'),
('rotary','gallery.subtitle','Capturando nuestros momentos de servicio y compañerismo.','Capturing our moments of service and fellowship.'),
('rotary','contact.phone','(787) 555-0192','(787) 555-0192'),
('rotary','contact.email','info@rotarymayaguez.org','info@rotarymayaguez.org'),
('rotary','contact.address','123 Calle Rotario, Mayagüez, PR 00680','123 Rotary St, Mayagüez, PR 00680'),
('rotaract','hero.title','Club Rotaract de Mayagüez','Rotaract Club of Mayagüez'),
('rotaract','hero.subtitle','Empoderando a jóvenes líderes para crear un cambio positivo.','Empowering young leaders to create positive change.'),
('rotaract','hero.content','Los clubes Rotaract reúnen a personas de 18 años en adelante para intercambiar ideas con líderes de la comunidad, desarrollar habilidades de liderazgo y profesionales, y divertirse a través del servicio.','Rotaract clubs bring together people ages 18 and older to exchange ideas with community leaders, develop leadership and professional skills, and have fun through service.'),
('rotaract','hero.joinTitle','Únete a Rotaract','Join Rotaract'),
('rotaract','card1.title','Red de Contactos','Networking'),
('rotaract','card1.desc','Conecta con otros profesionales jóvenes y líderes comunitarios.','Connect with other young professionals and community leaders.'),
('rotaract','card2.title','Desarrollo Profesional','Professional Development'),
('rotaract','card2.desc','Adquiere nuevas habilidades de liderazgo y manejo de proyectos.','Gain new leadership and project management skills.'),
('rotaract','card3.title','Impacto Social','Social Impact'),
('rotaract','card3.desc','Crea y participa en proyectos que benefician directamente a la comunidad.','Create and join projects that directly benefit the community.'),
('rotaract','history.subtitle','Nuestro Legado','Our Legacy'),
('rotaract','history.title','Historia de Rotaract','Rotaract History'),
('rotaract','history.content','Descubre cómo hemos crecido y el impacto que hemos logrado desde nuestra fundación.','Discover how we have grown and the impact we have achieved since our founding.'),
('rotaract','gallery.title','Galería Rotaract','Rotaract Gallery'),
('rotaract','gallery.subtitle','Momentos de liderazgo, servicio y compañerismo en acción.','Moments of leadership, service, and fellowship in action.');

-- ---------- PROJECTS ----------
insert into projects (club, title_es, title_en, description_es, description_en, image_path, show_on_home, sort_order) values
('rotary','Iniciativa de Agua Potable','Clean Water Initiative','Proveyendo filtros de agua a comunidades rurales.','Providing water filters to rural communities.','https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=800',true,1),
('rotary','Becas para Jóvenes','Youth Scholarships','Apoyando a estudiantes destacados en sus estudios universitarios.','Supporting outstanding students in their university studies.','https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',true,2),
('rotary','Reforestación Urbana','Urban Reforestation','Plantación de árboles nativos para restaurar nuestro entorno.','Planting native trees to restore our local environment.','https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',true,3),
('rotary','Clínicas de Salud','Health Clinics','Chequeos médicos gratuitos para familias de escasos recursos.','Free medical checkups for low-income families.','https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',true,4),
('rotary','Colecta de Alimentos','Food Drive','Recolección y distribución mensual de alimentos esenciales.','Monthly collection and distribution of essential foods.',null,false,5),
('rotary','Cuidado de Envejecientes','Senior Care','Apoyo y compañía a la población de la tercera edad.','Supporting the elderly with resources and companionship.',null,false,6);

-- ---------- EVENTS ----------
insert into events (club, title_es, title_en, description_es, description_en, event_date, event_time, location_es, location_en) values
('rotary','Gala Anual','Annual Gala','Gala de recaudación de fondos para becas.','Fundraising gala for our scholarship program.','2026-10-15','7:00 PM - 11:00 PM','Mayagüez Resort & Casino','Mayagüez Resort & Casino'),
('rotary','Limpieza de Costas','Beach Cleanup','Limpieza comunitaria en la bahía de Mayagüez.','Community cleanup at the Mayagüez bay.','2026-11-05','8:00 AM - 12:00 PM','Bahía de Mayagüez','Mayagüez Bay'),
('rotaract','Tutorías Comunitarias','Community Tutoring','Programa de tutorías después de la escuela para niños de la comunidad.','After-school tutoring program for children in the community.','2026-09-20','3:00 PM - 5:00 PM','Centro Comunitario','Community Center');

-- ---------- NEWS ----------
insert into news (club, title_es, title_en, excerpt_es, excerpt_en, content_es, content_en, image_path, published_at) values
('rotary','Donación de $10,000 al hospital local','Rotary grants $10,000 to local hospital','El Club Rotario de Mayagüez ha donado $10,000 al hospital local para la compra de equipo pediátrico.','The Rotary Club of Mayagüez has granted $10,000 to the local hospital to purchase new pediatric equipment.','El Club Rotario de Mayagüez se enorgullece en anunciar una donación de $10,000 al hospital local. Estos fondos serán utilizados para la adquisición de equipo pediátrico de última generación.','The Rotary Club of Mayagüez is proud to announce a $10,000 donation to the local hospital. These funds will be used to acquire state-of-the-art pediatric equipment.','https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800','2026-04-28'),
('rotary','Juramentación de la nueva directiva','New board of directors sworn in','Damos la bienvenida a nuestra nueva junta directiva para el próximo año rotario.','We welcome our new board of directors for the upcoming Rotary year.','Damos la bienvenida a nuestra nueva junta directiva. En una emotiva ceremonia de juramentación, los nuevos líderes se comprometieron a continuar el legado de servicio.','We welcome our new board of directors. In a moving swearing-in ceremony, the new leaders committed to continuing the legacy of service.','https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800','2026-03-15'),
('rotary','Éxito en la recolecta de primavera','Success at the spring food drive','Gracias a la comunidad, recolectamos más de 2,000 libras de alimentos.','Thanks to the community, we collected over 2,000 pounds of food.','Gracias al inmenso apoyo de la comunidad, nuestra recolecta de primavera fue un éxito rotundo. Logramos reunir más de 2,000 libras de alimentos no perecederos.','Thanks to the immense support of the community, our spring food drive was a resounding success. We gathered over 2,000 pounds of non-perishable food.','https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&q=80&w=800','2026-02-10');

-- ---------- HISTORY NODES ----------
insert into history_nodes (club, year, title_es, title_en, description_es, description_en, image_path, sort_order) values
('rotary','1932','Los Inicios','The Beginning','Se fundó el Club Rotario de Mayagüez, reuniendo a líderes locales con una visión compartida de servicio comunitario.','The Rotary Club of Mayagüez was chartered, bringing together local leaders with a shared vision of community service.','https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',1),
('rotary','1955','Primer Gran Proyecto de Salud','First Major Health Project','Lideró la construcción de la primera clínica de salud comunitaria.','Spearheaded the construction of the first community health clinic.','https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',2),
('rotary','1988','Programa de Becas Educativas','Educational Scholarships','Lanzó el fondo anual de becas, que ha ayudado a cientos de estudiantes locales.','Launched the annual scholarship fund, which has helped hundreds of local students.','https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',3),
('rotary','2010','Enfoque Ambiental','Environmental Focus','Inició los programas de reforestación urbana y limpieza de la bahía.','Started the urban reforestation and bay cleanup programs.','https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',4),
('rotary','Presente','Un Siglo de Servicio','A Century of Service','Continuando nuestro legado con nuevas generaciones de Rotarios.','Continuing our legacy with new generations of Rotarians.','https://images.unsplash.com/photo-1593113563332-6136cc17292d?auto=format&fit=crop&q=80&w=800',5),
('rotaract','2015','Fundación de Rotaract Mayagüez','Founding of Rotaract Mayagüez','Un grupo de jóvenes universitarios formó el primer club Rotaract en la ciudad.','A group of university students formed the first Rotaract club in the city.','https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',1),
('rotaract','2018','Primer Gran Proyecto Comunitario','First Major Community Project','Implementación del programa de tutorías después de la escuela.','Implementation of the after-school tutoring program.','https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',2),
('rotaract','2021','Premio a la Excelencia','Award for Excellence','Reconocimiento distrital por la labor durante la pandemia.','District recognition for outstanding work during the pandemic.','https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',3),
('rotaract','Presente','Creciendo y Sirviendo','Growing and Serving','Con más de 50 socios activos, el club continúa desarrollando líderes.','With more than 50 active members, the club continues developing leaders.','https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800',4);

-- ---------- GALLERY ----------
insert into gallery_images (club, image_path, caption_es, caption_en, sort_order) values
('rotary','https://images.unsplash.com/photo-1593113563332-6136cc17292d?auto=format&fit=crop&q=80&w=1200','Servicio comunitario','Community service',1),
('rotary','https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=1200','Proyecto de agua','Water project',2),
('rotary','https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200','Reunión de socios','Members meeting',3),
('rotary','https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200','Entrega de becas','Scholarship award',4),
('rotary','https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200','Reforestación','Reforestation',5),
('rotary','https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200','Clínica de salud','Health clinic',6),
('rotaract','https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1200','Jóvenes líderes','Young leaders',1),
('rotaract','https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200','Trabajo en equipo','Teamwork',2),
('rotaract','https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200','Voluntariado','Volunteering',3);
