import API_ENDPOINT from "../../api/api_endpoint";


const getApplication = (token, data) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT + "api/admin/getStudentApplication/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      })
        .then((result) => {
          if (result.status === 200) myResolve(result.json());
          else throw new Error(result.status);
        })
        .catch((err) => {
          myReject(err);
        });
    } else {
      myReject(false);
    }
  });
};

export default getApplication;