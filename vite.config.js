import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // This ensures proper routing on Vercel
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
});
