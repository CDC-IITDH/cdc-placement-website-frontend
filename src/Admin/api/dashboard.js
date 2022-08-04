import API_ENDPOINT from "../../api/api_endpoint";
import { getCookie } from "../../utils/getCookie";

const GetDashboard = (token) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT + "api/admin/getDashboard/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'X-CSRFToken': getCookie('csrftoken')
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

export { GetDashboard };
