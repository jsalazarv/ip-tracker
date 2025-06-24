# IP Tracker

Una aplicación web moderna para rastrear y visualizar información de direcciones IP, con historial de búsquedas y visualización en mapa.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)

## Características

- Búsqueda de información de IPs
- Historial de búsquedas con filtrado
- Eliminación de registros
- Detección de IPs duplicadas
- Visualización en mapa
- Modo oscuro/claro
- Internacionalización (ES/EN)
- Diseño 100% responsivo

## Tecnologías

- **Frontend:** React + TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase
- **API:** IP Geolocation and Threat Detection
- **Mapas:** Leaflet Maps
- **UI Components:** Headless UI
- **Iconos:** Phosphor Icons

## Instalación

1. Clona el repositorio:
   \`\`\`bash
   git clone https://github.com/jsalazarv/ip-tracker.git
   cd ip-tracker
   \`\`\`

2. Instala las dependencias:
   \`\`\`bash
   npm install
   \`\`\`

3. Crea un archivo \`.env\` en la raíz del proyecto con las siguientes variables:
   \`\`\`env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_llave_anonima_de_supabase
   VITE_RAPID_API_KEY=tu_llave_de_rapid_api
   \`\`\`

4. Inicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Configuración de Base de Datos

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ejecuta el siguiente SQL para crear la tabla necesaria:

\`\`\`sql
create table ip_records (
id uuid default uuid_generate_v4() primary key,
ip varchar not null,
city varchar,
country varchar,
country_code varchar,
flag_emoji varchar,
isp varchar,
latitude float,
longitude float,
postal varchar,
region varchar,
timezone varchar,
type varchar,
created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table ip_records enable row level security;
create policy "Enable read access for all users" on ip_records for select using (true);
create policy "Enable insert access for all users" on ip_records for insert using (true);
create policy "Enable delete access for all users" on ip_records for delete using (true);
\`\`\`

## Configuración de API

1. Crea una cuenta en [RapidAPI](https://rapidapi.com)
2. Suscríbete a [IP Geolocation and Threat Detection](https://rapidapi.com/ipregistry3-ipregistry/api/ip-geolocation-and-threat-detection/)
3. Copia tu API Key y agrégala al archivo \`.env\`

## Uso

1. Ingresa una dirección IP en el campo de búsqueda
2. La aplicación mostrará:

   - Información detallada de la IP
   - Ubicación en el mapa
   - Registro en el historial de búsquedas

3. En el historial puedes:

   - Filtrar registros
   - Eliminar entradas
   - Ver detalles expandidos
   - Recibir alertas de IPs duplicadas

4. Personaliza tu experiencia:
   - Cambia entre modo oscuro/claro
   - Alterna entre español e inglés
   - Centra el mapa en tu ubicación

## Responsive Design

La aplicación está optimizada para:

- Móviles
- Tablets
- Escritorio
