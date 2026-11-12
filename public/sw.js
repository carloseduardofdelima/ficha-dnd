const CACHE_PREFIX = 'a-forja-cache';
let CURRENT_CACHE = `${CACHE_PREFIX}-v5`;

const STATIC_ASSETS = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => { });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CURRENT_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
      .then(async () => {
        const clientList = await self.clients.matchAll({
          type: 'window',
          includeUncontrolled: true,
        });
        for (const client of clientList) {
          client.postMessage({ type: 'SW_ACTIVATED' });
        }
      })
  );
});

self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_CACHE') {
    if (event.data.buildId) {
      CURRENT_CACHE = `${CACHE_PREFIX}-${event.data.buildId}`;
    }
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      })
    );
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle http/https requests from the same origin
  if (!url.protocol.startsWith('http') || url.origin !== self.location.origin) {
    return;
  }

  // Never intercept API routes, auth endpoints, Next.js HMR, or RSC payloads
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/webpack-hmr') ||
    url.pathname === '/sw.js' ||
    request.headers.get('RSC') === '1' ||
    url.searchParams.has('_rsc')
  ) {
    return;
  }

  // For HTML navigation or document requests: Let the browser handle navigation natively.
  // Intercepting navigation with event.respondWith in Chromium causes ERR_FAILED
  // whenever server-side redirects (e.g. auth or route redirects) occur due to redirect mode mismatch.
  if (request.mode === 'navigate' || request.destination === 'document') {
    return;
  }

  // For Next.js hashed static chunks (/_next/static/*):
  // Their filenames include a build hash, so Cache-First with network fallback is optimal.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CURRENT_CACHE).then((cache) => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // For known static icons and manifest: Cache-First with network fallback
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CURRENT_CACHE).then((cache) => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Never intercept any other requests (HTML documents, pages, dynamic routes, API).
  // Leaving them unhandled lets the browser handle them natively with full redirect support.
  return;
});
