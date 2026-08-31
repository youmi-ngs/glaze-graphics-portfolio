import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (glaze-graphics.space) serves the site at the root, so base = '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
