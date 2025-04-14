import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@enums': path.resolve(__dirname, 'src/enums'),
      '@composables': path.resolve(__dirname, 'src/composables'),
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
