import API_ENDPOINT from "../api/api_endpoint";
import { getCookie } from "../utils/getCookie";

export const RefreshTokenSetup = (res, setToken, setUserTypes) => {
  // Timing to renew access token
  let refreshTiming = (3600 - 5 * 60) * 1000;


  const RefreshToken = async () => {
    const newAuthRes = await fetch(API_ENDPOINT+"api/refresh_token/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'X-CSRFToken': getCookie('csrftoken'),
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "refresh_token": res.refresh_token
          })
        });
    const newAuthResJson = await newAuthRes.json();
    refreshTiming = (3600 - 5 * 60) * 1000;
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    //localStorage.setItem("authToken", newAuthRes.id_token);
    setToken(newAuthResJson.id_token);
    

    // Setup the other timer after the first one
    setTimeout(RefreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(RefreshToken, refreshTiming);
};

export const RefreshToken = async () => {
  const token = JSON.parse(localStorage.getItem("refresh_token"))["refresh_token"];
  const newAuthRes = await fetch(API_ENDPOINT+"api/refresh_token/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      'X-CSRFToken': getCookie('csrftoken'),
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "refresh_token": token
        })
      });
  if (newAuthRes.status !== 200) {
    throw new Error("Refresh token failed");
  }
  const newAuthResJson = await newAuthRes.json();
  
  return newAuthResJson;
}
