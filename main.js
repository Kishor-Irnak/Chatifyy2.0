// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCp3RanzzQ2lGf8HQ-XaGe_W1cuxZe0GVc",
    authDomain: "authentication-a95dc.firebaseapp.com",
    projectId: "authentication-a95dc",
    storageBucket: "authentication-a95dc.appspot.com",
    messagingSenderId: "263589613044",
    appId: "1:263589613044:web:4df90594ae765365a3bda1",
    measurementId: "G-21NE0GLRVY",
    databaseURL: "https://authentication-a95dc-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Ask for notification permission
function requestPermission() {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            getToken(messaging, {
                vapidKey: "YOUR_VAPID_PUBLIC_KEY"
            }).then((currentToken) => {
                if (currentToken) {
                    console.log("FCM Token:", currentToken);
                    // Send this token to your server to send notifications
                } else {
                    console.log("No registration token available.");
                }
            }).catch((err) => {
                console.log("Error getting token:", err);
            });
        } else {
            console.log("Notification permission denied.");
        }
    });
}

// Listen for foreground messages
onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/icon.png"
    });
});

// Call this function when the page loads
requestPermission();
