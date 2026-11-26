var CACHE_NAME = 'ozzies-play-v1';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).then(function(res) {
      var copy = res.clone();
      caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
      return res;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});
