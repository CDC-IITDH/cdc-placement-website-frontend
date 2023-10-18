// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDNozpg23CATUK2dtH9YvgRCn41w0qFqEU",
  authDomain: "cdcnotifications-d77cf.firebaseapp.com",
  projectId: "cdcnotifications-d77cf",
  storageBucket: "cdcnotifications-d77cf.appspot.com",
  messagingSenderId: "206036807588",
  appId: "1:206036807588:web:6a03828c7f9ed17a6c5b31",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = (token) => {
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
      console.log("An error occurred while retrieving token. ", err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

function sendTokenToServer(currentToken, token) {
  if (
    !isTokenSentToServer() ||
    sessionStorage.getItem("FCM_token") != currentToken
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
        if (response.status == 200) {
          setTokenSentToServer(true);
          sessionStorage.setItem("FCM_token", currentToken);
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    // console.log(
    //   "Token already sent to server so won't send it again " +
    //     "unless it changes"
    // );
  }
}

function isTokenSentToServer() {
  if (sessionStorage.getItem("sentToServer") == 1) {
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
  // [START request_permission]
  messaging
    .requestPermission()
    .then(function () {
      requestForToken();
     // console.log("Notification permission granted.");
    })
    .catch(function (err) {
      console.log("Unable to get permission to notify.", err);
    });
  // [END request_permission]
}
