
const CACHE_NAMES = {
    static: 'static-v1',
    dynamic: 'dynamic-v1',
    pages: 'pages-v1'
};


const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/fonts/IRANYekanX-Regular.woff',
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAMES.static)
                .then(cache => cache.addAll(STATIC_ASSETS)),
            self.skipWaiting()
        ])
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        const isOldCache = !Object.values(CACHE_NAMES)
                            .includes(cacheName);
                        if (isOldCache) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            self.clients.claim()
        ])
    );
});


self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(handleNavigationRequest(event));
    } else if (event.request.url.includes('/api/')) {
        event.respondWith(handleApiRequest(event));
    } else {
        event.respondWith(handleStaticRequest(event));
    }
});

async function handleNavigationRequest(event) {

    const cache = await caches.open(CACHE_NAMES.pages);
    const cachedResponse = await cache.match(event.request);

    const networkPromise = fetch(event.request)
        .then(response => {
            cache.put(event.request, response.clone());
            return response;
        });

    return cachedResponse || networkPromise;
}

async function handleApiRequest(event) {
    try {
        const response = await fetch(event.request);
        const cache = await caches.open(CACHE_NAMES.dynamic);
        cache.put(event.request, response.clone());
        return response;
    } catch (error) {
        const cachedResponse = await caches.match(event.request);
        return cachedResponse || new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

async function handleStaticRequest(event) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
        fetch(event.request)
            .then(async response => {
                const cache = await caches.open(CACHE_NAMES.static);
                cache.put(event.request, response);
            });
        return cachedResponse;
    }
    return fetch(event.request);
}

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});
