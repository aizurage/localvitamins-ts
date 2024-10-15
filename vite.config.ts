import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import env from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: '/index.html',
    port: 5173,
  },
  plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env" })],
})
