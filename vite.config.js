import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// During `npm run dev`, serve the api/ functions the same way Vercel does in production.
const DEV_ROUTES = {
  '/api/ask': async (mod, body, env) => ({ text: await mod.askGemini(body, env) }),
  '/api/quote': async (mod, body, env) => mod.sendQuote(body, env),
}
const DEV_MODULES = { '/api/ask': '/api/_gemini.js', '/api/quote': '/api/_quote.js' }

function apiDev(env) {
  return {
    name: 'api-dev',
    configureServer(server) {
      for (const [route, run] of Object.entries(DEV_ROUTES)) {
        server.middlewares.use(route, async (req, res) => {
          const send = (status, data) => {
            res.statusCode = status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          }
          if (req.method !== 'POST') return send(405, { error: 'Method not allowed' })
          let raw = ''
          for await (const chunk of req) raw += chunk
          try {
            const mod = await server.ssrLoadModule(DEV_MODULES[route])
            send(200, await run(mod, JSON.parse(raw || '{}'), env))
          } catch (err) {
            console.error(`[${route}]`, err.message)
            send(err.status || 500, { error: err.expose ? err.message : 'Something went wrong' })
          }
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  // '' prefix loads non-VITE_ vars too; they stay on the server and never reach the bundle.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), apiDev(env)],
    build: {
      outDir: 'dist',
    },
  }
})
