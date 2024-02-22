import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://musicplayer-production-4f79.up.railway.app/',
        // target:'https://chords-r6bo.onrender.com/',
        // target:'/',
        // target:'http://localhost:4000',
        changeOrigin:true,
        // secure: false,
        // ws: false
      }
    }
  },
  plugins: [react()],
})
