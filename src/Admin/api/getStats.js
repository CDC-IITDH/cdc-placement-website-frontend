import API_ENDPOINT from "../../api/api_endpoint";

const GetStats = async (token, searchTerm) => {
    return new Promise((myResolve, myReject) => {
        if (token) {
            if(searchTerm){
                fetch(API_ENDPOINT + "api/admin/getStats/?search="+searchTerm, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
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
            }
            else{
                fetch(API_ENDPOINT + "api/admin/getStats/", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
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
            }
        } else {
            myReject(false);
        }
    });
};
export default GetStats;