importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = 'pwabuilder-page';
const offlineFallbackPage = [
  '../css/style.css',
  '../js/worker.js',
  '../js/main.js',
  '../js/curent.js',
  '../js/convert.js',
  '../js/analizCur.js',
  '../js/charts.js',
  '../js/spinner.js',
  '../img/tweed.png',
  '../img/spinner.svg',
  '../img/favicon.ico',
  '../js/worker.js'
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => offlineFallbackPage.forEach((el) => cache.add(el)))
  );
});
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) {
          return preloadResp;
        }
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
