import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',
    assetsDir: 'assets', // Opcional: Define una carpeta específica para los assets
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]' // Opcional: Personaliza los nombres de los archivos de assets
      }
    }
  }
})
