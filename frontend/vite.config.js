import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // penting untuk menerima request dari luar localhost
    allowedHosts: ["app.oxemed.live"], // tambahkan domain kamu di sini
  },
  plugins: [react()],
});
