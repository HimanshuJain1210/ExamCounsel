import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In local dev, proxy /api/chat to a local mock or Vercel dev server
    // Run `vercel dev` instead of `npm run dev` for full local testing with API
    port: 3000,
  },
});
