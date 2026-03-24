import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getSheetsPayload } from './src/lib/sheets.js'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
  },
  plugins: [
    react(),
    {
      name: 'blue-date-cms-dev-api',
      configureServer(server) {
        server.middlewares.use('/api/cms', async (_req, res) => {
          try {
            const payload = await getSheetsPayload(process.env.GOOGLE_SHEETS_ID)

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-store')
            res.end(JSON.stringify(payload))
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                message:
                  error instanceof Error
                    ? error.message
                    : 'Failed to load Google Sheets data',
              }),
            )
          }
        })
      },
    },
  ],
})
