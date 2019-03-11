this.addEventListener("message", ({ data, source: { id } }) => {
  this.clients.matchAll().then(clients => {
    clients.forEach(client => {
      console.log(client, data);
      if (client.id !== id) client.postMessage(data);
    });
  });
});
this.addEventListener("install", function(event) {
  event.waitUntil(this.skipWaiting()); // Activate worker immediately
});

this.addEventListener("activate", function(event) {
  event.waitUntil(this.clients.claim()); // Become available to all pages
});
