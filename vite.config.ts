import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@enums': path.resolve(__dirname, 'src/enums'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@plugins': path.resolve(__dirname, 'src/plugins'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@composables': path.resolve(__dirname, 'src/composables'),
    },
  },
  plugins: [vue(), tailwindcss()],
});
