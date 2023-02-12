const CACHE_NAME = "alarm-version-v1";
const urlsToCache = [
  "/alarm-clock/",
  "/alarm-clock/index.html",
  "/alarm-clock/assets/js/app.js",
  "/alarm-clock/assets/js/alarm.js",
  "/alarm-clock/assets/js/console.js",
  "/alarm-clock/assets/css/style.css",
  "/alarm-clock/assets/audio/theme.mp3",
  "/alarm-clock/assets/img/favicon.ico",
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
