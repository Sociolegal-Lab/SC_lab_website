import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/SC_lab/SC_lab_website/', // ← 一定要含兩層
})
