// vite.config.js:
// Import configuration helper function from Vite
import { defineConfig } from 'vite'
// Import React plugin to handle JSX compilation
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Register the React plugin for build processing
  plugins: [react()],
  // Vite server block:
  server: {
    allowedHosts: ['app', 'localhost'],
    host: true,
    port: 5173,
    // Add watch block to enable polling for Docker volumes, for Docker/virtualized file-watching:
    watch: {
      usePolling: true,
      interval: 1000 // Check for changes every 1 second
    }
  },
  // Vitest test runner configuration block
  test: {
    // Set testing environment to 'jsdom' so Vitest can simulate browser DOM APIs without a real browser.
    environment: 'jsdom',
    // Enable global test functions (expect, describe) without needing explicit imports in every test file.
    globals: true
  }
})
