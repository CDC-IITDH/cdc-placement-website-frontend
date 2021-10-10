import API_ENDPOINT from "./api_endpoint";

const SignIn = (token) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT+"api/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
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
