let CACHE_NAME = 'my-cache';
let urlsToCache = [
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

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['pigment'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});