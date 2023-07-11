import { getCookie } from "../utils/getCookie";
import API_ENDPOINT from "./api_endpoint";

const SignIn = (code) => {
  return new Promise((myResolve, myReject) => {
    if (code) {
      fetch(API_ENDPOINT + "api/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      })
        .then((result) => {
          if (result.status === 200) myResolve(result.json());
          else throw new Error("Error " + result.status);
        })
        .catch((err) => {
          myReject(false);
        });
    } else {
      myReject(false);
    }
  });
};

export { SignIn };
