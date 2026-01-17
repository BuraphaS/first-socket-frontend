/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import ESLint from 'vite-plugin-eslint2'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    ESLint(),
    Components({
      resolvers: [
        PrimeVueResolver({
          components: {
            prefix: 'Prime'
          },
          directives: {
            prefix: 'Prime'
          }
        })
      ]
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },

  define: {
    'process.env': {}
  },

  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: false,
    watch: {
      usePolling: true
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname, 
    },
    exclude: ['node_modules', 'dist', '.output', '.nuxt', 'public'],
    coverage: {
      // provider: 'istanbul' // or 'v8'
      provider: 'v8'
    },
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  }
})
