import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    testMatch: ['./tests/**/*.test.jsx'],
    coverage: {
      provider: 'v8', 
      reporter: ['text', 'json', 'html'],
    },
    globals: true
  }
})
