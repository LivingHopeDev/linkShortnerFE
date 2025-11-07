import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
// Tailwind is configured via PostCSS (postcss.config.js / tailwind.config.js).
// The package '@tailwindcss/vite' is not required and can cause a module not found error.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
