import API_ENDPOINT from "../../api/api_endpoint";

const GetApplications = (token, opening_id) => {
    return new Promise((myResolve, myReject) => {
        if (token) {
            fetch(
                API_ENDPOINT + "api/admin/getApplications/?opening_id=" + opening_id,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
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

const ExportAsExcel = (token, opening_id) => {
    return new Promise((myResolve, myReject) => {
        console.log(opening_id);
        if (token) {
            fetch(API_ENDPOINT + "api/admin/generateCSV/", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({opening_id: opening_id}),
            })
                .then((result) => {
                    console.log(result);
                    if (result.status === 200) myResolve(result.json());
                    else throw new Error("Error " + result.status);
                })
                .catch((err) => {
                    myReject(false);
                });
        } else {
            return myReject(false);
        }
    });
};


const ChangeOffer = (token, opening_id, offer_accepted) => {
    return new Promise((myResolve, myReject) => {
        if (token) {
            fetch(API_ENDPOINT + "api/admin/updateOfferAccepted/", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    opening_id: opening_id,
                    offer_accepted: offer_accepted,
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

const UpdateDeadline = (token, deadline, opening_id) => {
    return new Promise((myResolve, myReject) => {
        if (token) {
            fetch(API_ENDPOINT + "api/admin/updateDeadline/", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deadline_datetime: deadline,
                    opening_id: opening_id,

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

const MarkStatus = (token, opening_id, student_id, status) => {
    return new Promise((myResolve, myReject) => {
        if (token) {
            fetch(API_ENDPOINT + "api/admin/markStatus/", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "opening_id": opening_id,
                    "student_list": [
                        {
                            "student_id": student_id,
                            "student_selected": status
                        }
                    ]
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


export {GetApplications, ExportAsExcel, ChangeOffer, UpdateDeadline, MarkStatus};
