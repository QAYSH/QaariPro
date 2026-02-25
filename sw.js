/* ============================================
   QAARI — Service Worker (Offline Cache)
   ============================================ */

const CACHE_NAME = 'qaari-v2';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/variables.css',
    '/css/base.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/player.css',
    '/js/api.js',
    '/js/storage.js',
    '/js/router.js',
    '/js/player.js',
    '/js/ui.js',
    '/js/app.js',
];

// Install — cache static assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch — network first for API, cache first for assets
self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    // API requests — network only (don't cache dynamic data)
    if (url.hostname === 'api.alquran.cloud' || url.hostname === 'cdn.islamic.network') {
        e.respondWith(
            fetch(e.request).catch(() => new Response('{"error":"offline"}', {
                headers: { 'Content-Type': 'application/json' },
                status: 503
            }))
        );
        return;
    }

    // Static assets — cache first, fallback to network
    e.respondWith(
        caches.match(e.request).then((cached) => {
            return cached || fetch(e.request).then((res) => {
                if (res.ok && e.request.method === 'GET') {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                }
                return res;
            });
        }).catch(() => {
            // Fallback for navigation requests
            if (e.request.mode === 'navigate') {
                return caches.match('/index.html');
            }
        })
    );
});
