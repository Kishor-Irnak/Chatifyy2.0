// Register the Service Worker for Push Notifications
if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.register("sw.js").then(reg => {
        console.log("Service Worker Registered:", reg);
    }).catch(err => console.error("Service Worker Registration Failed:", err));
}

// Request Notification Permission
function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        console.log("Notification Permission:", permission);
    });
}

// Ask permission on page load
document.addEventListener("DOMContentLoaded", requestNotificationPermission);

// Firebase Notification for New Messages
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
let previousMessageCount = 0;

onValue(ref(db, "messages"), (snapshot) => {
    const messages = snapshot.val();
    if (!messages) return;

    const messageCount = Object.keys(messages).length;
    
    if (messageCount > previousMessageCount) {
        const lastMessage = Object.values(messages).pop();
        if (lastMessage.sender !== currentUser.uid) { // Avoid self-notifications
            sendPushNotification(lastMessage.text);
        }
    }

    previousMessageCount = messageCount;
});

function sendPushNotification(message) {
    navigator.serviceWorker.ready.then(reg => {
        reg.showNotification("New Chat Message", {
            body: message,
            icon: "chat_icon.png",
            badge: "badge_icon.png",
            vibrate: [500, 200, 500],
            actions: [{ action: "open", title: "Open Chat" }]
        });
    });
}
