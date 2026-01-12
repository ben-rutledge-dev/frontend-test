import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy'],
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
});
