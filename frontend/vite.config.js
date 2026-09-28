import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BACKEND = process.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Allow any host header (needed for remote/preview URLs and containers)
    allowedHosts: true,
    // The browser only ever talks to this dev server; /api is proxied to FastAPI,
    // so no CORS setup and no hardcoded backend origin is needed in the client.
    proxy: {
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        // keep SSE (streaming chat) working through the proxy
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            if (String(proxyRes.headers['content-type']).includes('text/event-stream')) {
              proxyRes.headers['cache-control'] = 'no-cache, no-transform'
            }
          })
        },
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
})
