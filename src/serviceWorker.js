const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  // The URL constructor is available in all browsers that support SW.
  // const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker-custom.js`;

    if (isLocalhost) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      checkValidServiceWorker(swUrl, config);

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      navigator.serviceWorker.ready.then(() => {
        console.log(
          "This web app is being served cache-first by a service " +
            "worker. To learn more, visit https://bit.ly/CRA-PWA"
        );
      });
    } else {
      // Is not localhost. Just register service worker
      registerValidSW(swUrl, config);
    }
  });
}

function registerValidSW(swUrl, config) {
  console.log("Registering Service Worker.",swUrl);
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      console.log("Registration Completed");
      registration.addEventListener("message", ({ data, source: { id } }) => {
        console.log("Message Recieved From Service Worker", data);
        this.clients.matchAll().then(clients => {
          clients.forEach(client => {
            if (client.id !== id) client.postMessage(data);
          });
        });
      });
    })
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
