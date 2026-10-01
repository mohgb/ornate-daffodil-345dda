import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// S.E.S.S — Vite configuration
// Static-exportable SPA. Route-level code splitting handled via React.lazy in App.jsx.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Keep the heavy motion libs in their own chunk so the shell stays light.
        manualChunks: {
          gsap: ['gsap'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
