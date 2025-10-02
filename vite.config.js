import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    deps: {
      inline: [/hexlet\/chatbot-v2/],
    },
    css: true,
  },
});
