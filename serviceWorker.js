const CACHE_NAME = "alarm-version-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/js/app.js",
  "/assets/js/alarm.js",
  "/assets/js/console.js",
  "/assets/css/style.css",
  "/assets/audio/theme.mp3",
];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        if (
          !response ||
          response.status !== 200 ||
          response.type !== "basic" ||
          !(event.request.url.indexOf("http") === 0)
        ) {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
