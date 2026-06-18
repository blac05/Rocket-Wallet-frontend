import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // <-- Add this import

export default defineConfig({
  plugins: [
    tailwindcss(), // <-- Add this to your plugins array
  ],
})