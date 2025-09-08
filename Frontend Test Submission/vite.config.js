import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Run strictly on :3000 as per the spec
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, strictPort: true, open: false },
})
