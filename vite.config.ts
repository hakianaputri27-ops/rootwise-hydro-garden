// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  vite: {
    plugins: [VitePWA({
      strategies: "generateSW",
      filename: "sw.js",
      registerType: "autoUpdate",
      injectRegister: null,
      devOptions: { enabled: false },
      includeAssets: ["favicon.ico", "icons/grow-school-192.png", "icons/grow-school-512.png", "images/hydroponic-garden.jpg"],
      manifest: {
        name: "Grow School | Hydroponics Learning App",
        short_name: "Grow School",
        description: "Learn hydroponics. Grow your own food.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#F7F8F1",
        theme_color: "#246B45",
        icons: [
          { src: "/icons/grow-school-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/grow-school-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth(?:\/|$)/],
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) => request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
            handler: "NetworkFirst",
            options: { cacheName: "grow-school-pages", networkTimeoutSeconds: 3, expiration: { maxEntries: 25, maxAgeSeconds: 2592000 } },
          },
          {
            urlPattern: ({ request, url }) => url.origin === self.location.origin && request.destination !== "document" && /\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.(?:js|css|woff2?)$/.test(url.pathname),
            handler: "CacheFirst",
            options: { cacheName: "grow-school-hashed-assets", expiration: { maxEntries: 80, maxAgeSeconds: 31536000 } },
          },
        ],
      },
    })],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
