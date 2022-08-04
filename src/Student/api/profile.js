import API_ENDPOINT from "../../api/api_endpoint";
import { getCookie } from "../../utils/getCookie";

const addResume = async (token, file) => {
    try {
      if (token) {
        const formData = new FormData()
        formData.append('file', file)
        const result = await fetch(API_ENDPOINT+
          "api/student/addResume/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
          'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
          }
        );
        console.log(result, "Add Profile APi", result.status);
        if (result.status === 200) {
          const data = await result.json();
          return data;
        } else {
          throw new Error(await result.json());
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteResume = async (token, file_name) => {
    try {
      if (token) {
        const result = await fetch(API_ENDPOINT+
          "api/student/deleteResume/",
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              'Content-Type':"application/json",
              Authorization: "Bearer " + token,
              'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
              'resume_file_name':file_name
            })
          }
        );
        if (result.status === 200) {
          const data = await result.json();
          return data;
        } else {
          throw new Error(await result.json());
        }
      }
    } catch (error) {
      console.log(error);
      return false
    }
  };
export {addResume, deleteResume}