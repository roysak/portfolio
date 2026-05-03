import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // base: command === 'build' ? '/portfolio/' : '/',
  base: command === 'build' ? '/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/index-[name].js',
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((n) => n.endsWith('.css')) ? 'assets/index.css' : 'assets/[name][extname]'
      }
    }
  }
}))
