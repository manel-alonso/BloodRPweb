# Blood RP - Servidor de Roleplay FiveM

Sitio web oficial del servidor de roleplay **Blood RP** para FiveM. Diseño oscuro con la estética del logo: rojos intensos, negros y acentos plateados.

## Características

- **Diseño FiveM**: Estética oscura e intensa inspirada en el logo de Blood RP
- **Colores del logo**: Rojos (#FF0000, tonos oscuros), negro y plateado
- **Contenido en español**: Todo el texto adaptado para la comunidad hispanohablante
- **Secciones**: Hero, Características, Opiniones, Destacados, VIP, FAQ
- **Modo claro/oscuro**: Toggle para preferencia del usuario
- **Responsive**: Optimizado para móvil y escritorio

## Imágenes

Las imágenes del sitio se encuentran en `public/`:
- `LOGO_png.png` - Logo principal de Blood RP
- `image1.jpg`, `image2.jpg`, `image3.jpg` - Imágenes del servidor

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

El build genera los archivos en `docs/` para publicar en GitHub Pages:

1. En el repo: **Settings → Pages → Source**: selecciona "Deploy from a branch"
2. **Branch**: main (o master), carpeta **/docs**
3. Si el repo se llama distinto a `bloodrpweb`, crea `.env` con:
   ```
   VITE_BASE_URL=/nombre-de-tu-repo/
   ```
4. Tras el build, haz commit y push de la carpeta `docs/`

## Estructura

```
src/
├── marketing-page/
│   ├── MarketingPage.tsx
│   └── components/
│       ├── AppAppBar.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── LogoCollection.tsx
│       ├── Highlights.tsx
│       ├── Pricing.tsx (Rangos VIP)
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── Footer.tsx
│       ├── SitemarkIcon.tsx (Logo Blood RP)
│       └── DiscordIcon.tsx
└── shared-theme/ (colores rojo/negro/plateado)
```

## Login con Discord

El sitio incluye autenticación con Discord (OAuth2) usando un API serverless para obtener avatar y nombre:

1. Crea una aplicación en [Discord Developer Portal](https://discord.com/developers/applications)
2. En OAuth2 → Redirects, añade tu URL de callback
3. Copia `.env.example` a `.env` y configura `VITE_DISCORD_CLIENT_ID`

**Para avatar y nombre real**: necesitas desplegar el API en Vercel. Ver [DEPLOY.md](DEPLOY.md) para instrucciones completas.

## Personalización

- **Discord**: Reemplaza `https://discord.gg` con tu enlace de invitación real en los componentes
- **Imágenes**: Añade más imágenes en `public/` y referéncialas en los componentes
