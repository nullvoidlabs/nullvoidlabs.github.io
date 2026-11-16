---
layout: null
sitemap: false
---
// The previous theme (Chirpy) installed an offline-caching service worker at
// this path. Returning visitors' browsers re-check this file, so this version
// clears its caches and removes itself, letting them load the live site.
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: "window" }); })
      .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
  );
});
