import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Futurama Characters',
        short_name: 'FuturamaApp',
        description: 'Explora personajes de Futurama',
        theme_color: '#3563E9',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/perro.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/perro2.png',
            sizes: '128x128',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
