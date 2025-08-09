self.addEventListener("install",event =>{
    console.log("[ServiCe Worker] 설치 완료");
    event.waitUntil(
        caches.open("todo-app-v1").then(cache=>{
            return cache.addAll([
                "./todoList.html",
                "./todoList.css",
                "./todoList.js" ,
                "./manifest.json",
                "./img/icon-192.png",
                "./img/icon-512.png"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
  event.respondWith( // ← respondWith가 정답!
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});