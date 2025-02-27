import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': 'http://192.168.13.46:8888/api/'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()]
})
