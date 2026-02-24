import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    // Use Terser for JS minification (requires 'terser' to be installed)
    minify: 'terser',
    // Use Lightning CSS for CSS minification
    cssMinify: 'lightningcss',
  },
})