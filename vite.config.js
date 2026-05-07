import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load .env.local so we can inject the API key into the dev proxy
  const env = loadEnv(mode, process.cwd(), '')
  const vtKey = env.VITE_VT_KEY || ''

  return {
    plugins: [react()],
    server: {
      proxy: {
        // In dev: intercept /api/vt-scan and rewrite to VirusTotal with the key
        // In prod: Vercel routes /api/vt-scan to the serverless function in /api/vt-scan.js
        '/api/vt-scan': {
          target: 'https://www.virustotal.com',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              const url = new URL(req.url, 'http://localhost')
              const resource = url.searchParams.get('resource') || ''
              proxyReq.path = `/vtapi/v2/url/report?apikey=${vtKey}&resource=${encodeURIComponent(resource)}`
            })
          },
        },
      },
    },
  }
})