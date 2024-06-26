import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Базовый путь для разных сред развертывания
const base = (() => {
  switch (process.env.DEPLOY_ENV) {
    case 'gh-pages':
      return '/vite_react/'; // для GitHub Pages
    case 'firebase':
      return '/'; // для Firebase Hosting
    default:
      return '/'; // для локальной разработки
  }
})();

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Упрощенный путь к src
    },
  },
});
