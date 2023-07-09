import API_ENDPOINT from "../../api/api_endpoint";

const getJNF = (placement_id) => {
  return new Promise((myResolve, myReject) => {
    if (placement_id) {
      fetch(
        API_ENDPOINT +
          "api/company/getAutoFillJnf/?placement_id=" +
          placement_id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
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

export default getJNF;
