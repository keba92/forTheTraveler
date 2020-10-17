const CACHE = 'cache-update-and-refresh';
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(['../css/style.css',
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
                                           '../js/worker.js']))
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open(CACHE).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      }),
    );
  });