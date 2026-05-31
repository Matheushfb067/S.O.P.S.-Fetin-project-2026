import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // ← adiciona

export default defineConfig({
  plugins: [react(), tailwindcss()],  // ← adiciona tailwindcss()
})