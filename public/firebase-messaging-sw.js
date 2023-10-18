// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDNozpg23CATUK2dtH9YvgRCn41w0qFqEU",
  authDomain: "cdcnotifications-d77cf.firebaseapp.com",
  projectId: "cdcnotifications-d77cf",
  storageBucket: "cdcnotifications-d77cf.appspot.com",
  messagingSenderId: "206036807588",
  appId: "1:206036807588:web:6a03828c7f9ed17a6c5b31",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  payload = payload.data;

  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    icon: payload.icon_url,
  };

  self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    clients.openWindow(payload.url);
    // window.open(payload.url, "_blank");
  });
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
