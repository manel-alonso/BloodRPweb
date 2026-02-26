import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

// Para GitHub Pages: base debe ser /nombre-repo/ (ej: /bloodrpweb/)
// Para dominio propio o user page: base: '/'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_URL || '/BloodRPweb/';

  const apiUrl = env.VITE_API_URL?.replace(/\/$/, '');
  return {
    base,
    server: apiUrl
      ? {
          proxy: {
            '/api': {
              target: apiUrl,
              changeOrigin: true,
            },
          },
        }
      : undefined,
    plugins: [
      react(),
      {
        name: 'copy-404',
        closeBundle() {
          copyFileSync(join('docs', 'index.html'), join('docs', '404.html'));
        },
      },
    ],
    build: {
      outDir: 'docs',
      emptyOutDir: true,
    },
  };
});
