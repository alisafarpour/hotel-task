import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const app = express()

// Compression in production
if (isProduction) {
    app.use(compression())
}

// Static file serving
if (isProduction) {
    app.use(base, express.static(path.resolve(__dirname, 'dist/client'), {
        extensions: ['html'],
    }))
} else {
    // Development: Vite middleware
    const { createServer } = await import('vite')
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base,
    })
    app.use(vite.middlewares)
}

// Handle all routes for SPA
app.get('*', async (req, res) => {
    try {
        let template
        if (isProduction) {
            template = await fs.readFile(
                path.resolve(__dirname, 'dist/client/index.html'),
                'utf-8'
            )
        } else {
            const vite = await import('vite')
            const server = await vite.createServer({
                server: { middlewareMode: true },
                appType: 'custom'
            })
            template = await fs.readFile(
                path.resolve(__dirname, 'index.html'),
                'utf-8'
            )
            template = await server.transformIndexHtml(req.originalUrl, template)
        }

        // Send HTML for client-side hydration
        res.status(200)
            .set({ 'Content-Type': 'text/html' })
            .send(template)
    } catch (e) {
        console.error(e)
        res.status(500).end(e.message)
    }
})

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})