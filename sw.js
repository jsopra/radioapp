
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
		.register('./sw.js');
  }

var cacheName = 'chapeCacheUsersV1';

var filesToCache = [
  'index.html',
  'manifest.json',
  'logo.png',
  'aovivo.css',
];


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
