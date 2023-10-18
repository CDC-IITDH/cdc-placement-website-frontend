import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./firebase";

const Notification = ({ token }) => {
  //console.log(profile);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () => toast(<ToastDisplay />);

  //toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  if (token) {
    requestForToken(token);
  }

  onMessageListener()
    .then((payload) => {
      payload = payload.data;
      const notificationTitle = payload.title;

      setNotification({ title: notificationTitle, body: payload.body });
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster position="bottom-right" reverseOrder={false} />;
};

export default Notification;
