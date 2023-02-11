import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@views': path.resolve(__dirname, "./src/views"),
      '@assets': path.resolve(__dirname, "./src/assets"),
      '@components': path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  }
})
