# Despliegue en Vercel

Este proyecto incluye un API serverless (`api/auth/discord.ts`) que intercambia el código OAuth de Discord por tokens y obtiene el usuario. Sigue estos pasos para desplegar en Vercel.

## Opción A: Todo en Vercel (recomendado)

Despliega el proyecto completo en Vercel. El frontend y el API estarán en el mismo dominio.

### 1. Conectar el repositorio

1. Ve a [vercel.com](https://vercel.com) e inicia sesión (con GitHub si el repo está ahí)
2. Clic en **Add New** → **Project**
3. Importa tu repositorio `bloodrpweb`
4. Vercel detectará la configuración automáticamente

### 2. Variables de entorno

En **Settings** → **Environment Variables**, añade:

| Variable | Valor | Notas |
|----------|-------|-------|
| `VITE_DISCORD_CLIENT_ID` | Tu Client ID de Discord | De [Discord Developer Portal](https://discord.com/developers/applications) → tu app → OAuth2 |
| `DISCORD_CLIENT_SECRET` | Tu Client Secret de Discord | Mismo lugar, **nunca** lo expongas en el frontend |
| `VITE_BASE_URL` | `/` | Para que la app esté en la raíz (ej. `tudominio.vercel.app`) |
| `DISCORD_BOT_TOKEN` | Token del bot de Discord | Bot debe estar en el servidor con permiso para leer miembros |
| `DISCORD_GUILD_ID` | ID del servidor Discord | Para verificar whitelist por roles |
| `WHITELIST_ROLE_IDS` | IDs de roles separados por coma | Roles que indican que el usuario está whitelisted |

### 3. Discord Redirect URIs

En [Discord Developer Portal](https://discord.com/developers/applications) → tu app → OAuth2 → Redirects, añade:

- `https://tu-proyecto.vercel.app/auth/callback` (reemplaza con tu URL real de Vercel)
- `http://localhost:5173/auth/callback` (para desarrollo local)

### 4. Desplegar

Clic en **Deploy**. Tras el despliegue, la app estará en `https://tu-proyecto.vercel.app`.

---

## Opción B: Frontend en GitHub Pages + API en Vercel

Si quieres mantener el frontend en GitHub Pages y solo usar Vercel para el API.

### 1. Desplegar el API en Vercel

1. Crea un proyecto en Vercel conectado al mismo repositorio
2. En **Settings** → **Build & Development**:
   - **Build Command**: `echo "API only"` (o deja vacío si Vercel lo permite)
   - **Output Directory**: deja vacío o usa `api`
3. En **Root Directory**: deja `.` (raíz del repo)
4. Añade las variables de entorno:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`

### 2. Configurar el frontend

En tu build de GitHub Pages (o en `.env` antes de hacer build), añade:

```
VITE_API_URL=https://tu-proyecto.vercel.app
```

Así el frontend sabrá dónde llamar al API para intercambiar el código.

### 3. Discord Redirect URIs

Añade en Discord:
- `https://manel-alonso.github.io/BloodRPweb/auth/callback` (tu URL de GitHub Pages)
- `http://localhost:5173/BloodRPweb/auth/callback` (dev local)

---

## Configurar Whitelist (Discord Bot)

Para que la página de Whitelist funcione:

1. **Crear un bot** en [Discord Developer Portal](https://discord.com/developers/applications) → tu app → Bot → Add Bot
2. **Token**: Copia el token del bot y añádelo como `DISCORD_BOT_TOKEN` en Vercel
3. **Guild ID**: Activa "Developer Mode" en Discord (Configuración → Avanzado), clic derecho en tu servidor → "Copiar ID del servidor". Añádelo como `DISCORD_GUILD_ID`
4. **Roles de whitelist**: Clic derecho en el rol que indica whitelist → "Copiar ID del rol". Añade uno o más IDs separados por coma en `WHITELIST_ROLE_IDS`
5. **Invitar el bot** al servidor con el permiso "Ver miembros del servidor" (Server Members Intent si usas privilegios)

---

## Verificación

Tras desplegar:

1. Ve a `/login` y haz clic en "Continuar con Discord"
2. Autoriza en Discord
3. Deberías volver a la app con tu avatar y nombre de Discord en el header

Si algo falla, revisa la consola del navegador (F12) y los logs de Vercel en **Deployments** → tu deployment → **Functions**.
