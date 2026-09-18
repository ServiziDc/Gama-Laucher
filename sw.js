const CACHE = 'gama-launcher-v13';
const ASSETS = ['./index.html','./manifest.json'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>
    Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
  ));
  self.clients.claim();
});

/* Network-first per index.html e manifest.json: prende sempre la versione più
   recente dal server quando c'è connessione, e usa la cache solo come riserva
   se offline. Così gli aggiornamenti del launcher arrivano subito, senza
   restare bloccati su una versione vecchia salvata in precedenza. */
self.addEventListener('fetch', e=>{
  e.respondWith(
    fetch(e.request)
      .then(res=>{
        const resClone=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request, resClone));
        return res;
      })
      .catch(()=>caches.match(e.request))
  );
});
