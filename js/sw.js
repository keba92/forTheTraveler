const CACHE_NAME = 'my-cache';
const urlsToCache = [
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
  '../js/worker.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['pigment'];
  event.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    );
  }));
});
