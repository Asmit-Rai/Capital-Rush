import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      external: [], // Remove "axios" from external
    },
  },
  resolve: {
    alias: {
      axios: "axios",
    },
  },
});
