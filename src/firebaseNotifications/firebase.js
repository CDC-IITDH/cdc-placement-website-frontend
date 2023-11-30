// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import Swal from "sweetalert2";

const firebaseConfig = {
  apiKey: "AIzaSyDNozpg23CATUK2dtH9YvgRCn41w0qFqEU",
  authDomain: "cdcnotifications-d77cf.firebaseapp.com",
  projectId: "cdcnotifications-d77cf",
  storageBucket: "cdcnotifications-d77cf.appspot.com",
  messagingSenderId: "206036807588",
  appId: "1:206036807588:web:6a03828c7f9ed17a6c5b31",
};

let messaging;

if ("serviceWorker" in navigator && isSupported()) {
  initializeApp(firebaseConfig);
  messaging = getMessaging();
} else {
  console.log("Service worker is not supported in this browser.");
}

export const requestForToken = (token) => {
  if ("serviceWorker" in navigator && isSupported()) {
    return getToken(messaging, {
      vapidKey:
        "BJfvjeL3lvzQi9Tk6Mra9i6gHDaa6bCYmEF8sB9Dsn1ERtXq5XeWvgJI-Dze5MlnEFds-X3djtBlk4oogbcMuXs",
      // serviceWorkerRegistration,
    })
      .then((currentToken) => {
        if (currentToken) {
          //console.log("current token for client: ", currentToken);

          if (currentToken) {
            sendTokenToServer(currentToken, token);
          } else {
            console.log(
              "No Instance ID token available. Give permission to generate one."
            );

            setTokenSentToServer(false);
          }
        } else {
          setTokenSentToServer(false);
          requestPermission();
          console.log(
            "No registration token available. Give permission to generate one."
          );
        }
      })
      .catch((err) => {
        var notified = sessionStorage.getItem("notified");
        if (!notified) {
          Swal.fire({
            title: "Notifications are disabled",
            text: "Please enable browser notifications to receive updates deadlines and other important information",
            icon: "info",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              sessionStorage.setItem("notified", 1);
            }
          });
        }
         console.log("An error occurred while retrieving token. permission not granted");
      });
  }
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    if ("serviceWorker" in navigator && isSupported()) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });

function sendTokenToServer(currentToken, token) {
  if (
    !isTokenSentToServer() ||
    sessionStorage.getItem("FCM_token") !== currentToken
  ) {
    //console.log("Sending token to server...");
    try {
      fetch(process.env.REACT_APP_PUSH_API_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fcm_token: currentToken,
        }),
      }).then(function (response) {
        //console.log(response);
        if (response.status === 200) {
          setTokenSentToServer(true);
          sessionStorage.setItem("FCM_token", currentToken);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

function isTokenSentToServer() {
  if (sessionStorage.getItem("sentToServer") === 1) {
    return true;
  }
  return false;
}

function setTokenSentToServer(sent) {
  if (sent) {
    sessionStorage.setItem("sentToServer", 1);
  } else {
    sessionStorage.setItem("sentToServer", 0);
  }
}
function requestPermission() {
  //console.log("Requesting permission...");

  messaging
    .requestPermission()
    .then(function () {
      requestForToken();
      // console.log("Notification permission granted.");
    })
    .catch(function (err) {
      console.log("Unable to get permission to notify.", err);
    });
}
