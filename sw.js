// Fleet Management (Palmer Fleet) — Service Worker
// Bump CACHE_VERSION on every deploy of updated files or the PWA serves stale copies.
const CACHE_VERSION = 'palmer-fleet-v3';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './vendor/jspdf.umd.min.js',
  './vendor/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', (evt) => {
  // Individual adds (not addAll) so one missing/renamed file can't fail the whole
  // precache silently — each file is best-effort on its own.
  evt.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      Promise.all(PRECACHE.map((url) => cache.add(url).catch((err) => {
        console.warn('SW precache skipped (file missing or failed to fetch):', url, err);
      })))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first with network fallback; network refresh updates cache in background.
self.addEventListener('fetch', (evt) => {
  if (evt.request.method !== 'GET') return;
  evt.respondWith(
    caches.match(evt.request).then((cached) => {
      const fetchPromise = fetch(evt.request).then((networkResp) => {
        if (networkResp && networkResp.status === 200) {
          const clone = networkResp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(evt.request, clone));
        }
        return networkResp;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
