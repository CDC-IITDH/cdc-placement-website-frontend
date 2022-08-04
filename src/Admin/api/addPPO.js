import API_ENDPOINT from "../../api/api_endpoint";
import { getCookie } from "../../utils/getCookie";


const AddPPO = async (token, data) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT + "api/admin/addPPO/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(data),
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

export default AddPPO;