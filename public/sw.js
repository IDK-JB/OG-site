/* Garde la vidéo d'Athlete Project en cache pour qu'elle démarre sans attente.
   Seuls les fichiers /assets/ap-training* passent par ici, le reste du site
   n'est pas intercepté. */
var CACHE = "video-ap-2";
var VIDEO = /^\/assets\/ap-training[^/]*\.(mp4|webm)$/;

/* Fichiers déjà en cache : les autres vont au réseau sans passer par ici,
   le lecteur vidéo du navigateur garde alors son chargement habituel. */
var enCache = {};
var pret = caches.open(CACHE).then(function (cache) {
  return cache.keys().then(function (reqs) {
    reqs.forEach(function (r) { enCache[new URL(r.url).pathname] = true; });
  });
});

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (noms) {
      return Promise.all(
        noms.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

function precharger(url) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(url).then(function (deja) {
      if (deja) { enCache[url] = true; return; }
      return fetch(url).then(function (rep) {
        if (rep.status === 200) return cache.put(url, rep).then(function () { enCache[url] = true; });
      });
    });
  });
}

self.addEventListener("message", function (event) {
  var url = event.data && event.data.precharger;
  if (url && VIDEO.test(url)) event.waitUntil(pret.then(function () { return precharger(url); }));
});

/* Les lecteurs vidéo demandent des plages d'octets : on découpe la réponse en cache. */
function plage(rep, entete) {
  return rep.arrayBuffer().then(function (buf) {
    var total = buf.byteLength;
    var m = /bytes=(\d*)-(\d*)/.exec(entete);
    var debut = m && m[1] ? Number(m[1]) : 0;
    var fin = m && m[2] ? Math.min(Number(m[2]), total - 1) : total - 1;
    if (m && !m[1] && m[2]) {
      debut = Math.max(total - Number(m[2]), 0);
      fin = total - 1;
    }
    if (debut >= total || debut > fin) {
      return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + total } });
    }
    return new Response(buf.slice(debut, fin + 1), {
      status: 206,
      headers: {
        "Content-Type": rep.headers.get("Content-Type") || "video/mp4",
        "Content-Range": "bytes " + debut + "-" + fin + "/" + total,
        "Content-Length": String(fin - debut + 1),
        "Accept-Ranges": "bytes",
      },
    });
  });
}

self.addEventListener("fetch", function (event) {
  var url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== location.origin || !enCache[url.pathname]) return;
  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(url.pathname).then(function (rep) {
        if (!rep) return fetch(event.request);
        var range = event.request.headers.get("Range");
        return range ? plage(rep, range) : rep;
      });
    })
  );
});
