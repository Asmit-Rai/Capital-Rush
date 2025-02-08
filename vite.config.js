import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["axios"], // Mark axios as external if Vercel fails to resolve it
    },
  },
})
