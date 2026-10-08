import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// The project has one .env, at the repo root. Only the public Supabase URL and
// anon key are passed to the browser; nothing else in that file is. Real
// environment variables (Vercel, Docker build args) take precedence over it.
const ROOT_DIR = '..'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, ROOT_DIR, ''), ...process.env }
  return {
    plugins: [react()],
    envDir: ROOT_DIR,
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.SUPABASE_URL ?? ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.SUPABASE_ANON_KEY ?? ''),
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  }
})
