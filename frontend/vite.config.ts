/**
 * Vite Configuration File
 * This file configures the build tool and development server settings for the application.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Setup __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Vite Configuration
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  // Base public path when served in production
  base: '/',

  // Development server configuration
  server: {
    // Listen on all network interfaces
    host: "::",
    // Default port for development server
    port: 5173,
    // Proxy configuration for API requests
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Vite plugins
  plugins: [
    // React plugin for JSX support
    react(),
  ],

  // Module resolution configuration
  resolve: {
    alias: {
      // Alias for src directory to enable absolute imports
      "@": resolve(__dirname, "./src"),
    },
  },

  // Build configuration
  build: {
    // Output directory for production build
    outDir: 'dist',
    // Directory for static assets
    assetsDir: 'assets',
    // Generate source maps for debugging
    sourcemap: true,
    // Rollup bundler options
    rollupOptions: {
      output: {
        // Disable automatic chunk splitting
        manualChunks: undefined
      }
    }
  }
});
