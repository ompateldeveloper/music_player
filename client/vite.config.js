import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://chords-r6bo.onrender.com/',
        changeOrigin:true
      }
    }
  },
  plugins: [react()],
})
