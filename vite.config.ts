import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import {VitePWA} from "vite-plugin-pwa";
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
    base: './',
    server: {
        strictPort: false,
        port: 5173,
        host: "0.0.0.0",
    },
    build: {
        outDir: 'dist/client',
        rollupOptions: {
            input: {
                client: './index.html'
            }
        }
    },
    // build: {
    //     ssr: "src/entry-server.tsx",
    //     outDir: "dist/server",
    // },
    // ssr: {
    //     external: ['react-router-dom','leaflet']
    // },
    // optimizeDeps: {
    //     exclude: ['react-router-dom','leaflet']
    // },
    plugins: [react(), tsconfigPaths(),
        compression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
            compressionOptions: {
                level: 9
            },
            filter: /\.(js|css|html|json|svg)$/i,
        }),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            includeAssets: ['favicon.ico', "icon-192.png", "icon-512.png", 'apple-touch-icon.png'],
            manifest: {
                name: "Hotel Listing",
                short_name: "HotelApp",
                theme_color: "#ea383d",
                screenshots: [
                    {
                        src: "/screenshot-desktop.png",
                        sizes: "1920x1080",
                        type: "image/png",
                        form_factor: "wide",
                    },
                    {
                        src: "/screenshot-mobile.png",
                        sizes: "750x1334",
                        type: "image/png",
                        form_factor: "narrow",
                    },
                ],
                icons: [
                    {
                        src: "/icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/icon-256.png",
                        sizes: "256x256",
                        type: "image/png",
                    },
                    {
                        src: "/icon-144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:js|css|svg|png|jpg|jpeg|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'static-assets',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            }
                        }
                    }
                ]
            }
        })
    ],
})
