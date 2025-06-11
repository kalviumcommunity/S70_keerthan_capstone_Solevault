import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/api': { // All requests to /api/... will be proxied
        target: 'http://localhost:8000', // <<<< YOUR BACKEND SERVER ADDRESS
        changeOrigin: true, // Recommended for most cases
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
