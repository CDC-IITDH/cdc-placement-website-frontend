import API_ENDPOINT from "../../api/api_endpoint";
import { getCookie } from "../../utils/getCookie";

const GetApplications = (token, opening_id, opening_type) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(
        API_ENDPOINT + "api/admin/getApplications/?opening_id=" + opening_id + "&opening_type=" + opening_type,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            'X-CSRFToken': getCookie('csrftoken')
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

const ExportAsExcel = (token, opening_id,opening_type) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT + "api/admin/generateCSV/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ opening_id: opening_id,opening_type: opening_type}),
      })
        .then((result) => {
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

const DownloadResume = (token, opening_id,opening_type) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT + "api/admin/downloadResume/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ opening_id: opening_id ,opening_type: opening_type}),
      })
        .then((result) => {
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


const ChangeOffer = (token, opening_id, opening_type, offer_accepted) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT + "api/admin/updateOfferAccepted/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
          opening_id: opening_id,
          offer_accepted: offer_accepted,
          opening_type: opening_type,
        }),
      })
        .then((result) => {
          if (result.status === 200) myResolve(result.json());
          else throw new Error("Error " + result.status);
        })
        .catch((err) => {
          myReject(err);
        });
    } else {
      myReject("No token");
    }
  });
};

const UpdateDeadline = (token, deadline,opening_id ,opening_type) => {
  return new Promise((myResolve, myReject) => {
    if (token) {
      fetch(API_ENDPOINT + "api/admin/updateDeadline/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
          deadline_datetime: deadline,
          opening_id: opening_id,
          opening_type: opening_type


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

const MarkStatus = (token, opening_id, student_id, status,opening_type) => {
    return new Promise((myResolve, myReject) => {
        if (token) {
            fetch(API_ENDPOINT + "api/admin/markStatus/", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    "opening_id": opening_id,
                    "opening_type":opening_type,
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

const DeleteAdditionalInfo = (token, opening_id, field) => {
  return new Promise((myResolve, myReject) => {
      if (token) {
          fetch(API_ENDPOINT + "api/admin/deleteAdditionalInfo/", {
              method: "POST",
              headers: {
                  Authorization: "Bearer " + token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  'X-CSRFToken': getCookie('csrftoken')
              },
              body: JSON.stringify({
                  "opening_id": opening_id,
                  "field": field
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

const AddAdditionalInfo = (token, opening_id, field) => {
  return new Promise((myResolve, myReject) => {
      if (token) {
          fetch(API_ENDPOINT + "api/admin/addAdditionalInfo/", {
              method: "POST",
              headers: {
                  Authorization: "Bearer " + token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  'X-CSRFToken': getCookie('csrftoken')
              },
              body: JSON.stringify({
                  "opening_id": opening_id,
                  "field": field
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

export { GetApplications, ExportAsExcel, DownloadResume, ChangeOffer, UpdateDeadline, MarkStatus, DeleteAdditionalInfo, AddAdditionalInfo };
