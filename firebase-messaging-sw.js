// Import Firebase
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

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
firebase.initializeApp(firebaseConfig);

// Get Firebase Messaging
const messaging = firebase.messaging();

// Background notification listener
messaging.onBackgroundMessage((payload) => {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/icon.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
