// Service Worker (sw.js)
self.addEventListener("push", function (event) {
    const options = {
        body: event.data ? event.data.text() : "New Message Received!",
        icon: "chat_icon.png",
        badge: "badge_icon.png",
        vibrate: [500, 200, 500], 
        actions: [
            { action: "open", title: "Open Chat" },
            { action: "dismiss", title: "Dismiss" }
        ]
    };

    event.waitUntil(
        self.registration.showNotification("Chat Message", options)
    );
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    if (event.action === "open") {
        clients.openWindow("index.html"); // Change to your chat app URL
    }
});
