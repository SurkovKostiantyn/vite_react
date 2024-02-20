import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vite_react/' : '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
