import team from "./teamcopy.module.css";
import jsn from "./resp.json";
import { useEffect, useState } from "react";
import API_ENDPOINT from "../../api/api_endpoint";
import { getCookie } from "../../utils/getCookie";


export default function TeamProfile({setShowLoader}) {
  const [resp, setResp] = useState()
  
  useEffect(() => {
    fetch(API_ENDPOINT+"api/student/getContributorStats/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRFToken': getCookie('csrftoken')
      },
    }).then(
      (result) => {
        if(result.status === 200){
          setResp(result.body)
        }
      }
    )
    setShowLoader(false);
  }, [setShowLoader,setResp])
  return (
    <section className={team.section_team}>
      <div className={team.container}>
        {/*<!-- Start Header Section -->*/}
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className={team.header_section}>
              {/* <h3 className={team.small_title}>Our Experts</h3> */}
              <h2 className={team.title}>Let's meet with our team members</h2>
            </div>
          </div>
        </div>
        {/*<!-- / End Header Section -->*/}
        <div className="row">
          {resp?.data
            .sort((a, b) => b.commits - a.commits)
            .map((e, index) => {
              return (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={team + index}>
                  <div className={team.single_person}>
                    <div className={team.person_image}>
                      <img
                        src={
                          e.image ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt=""
                      />
                      <span className={team.icon}>
                        <i> {index + 1}</i>
                      </span>
                    </div>
                    <div className={team.person_info}>
                      <h3 className={team.full_name}>{e.name}</h3>
                      <span class={team.speciality}>Commits: {e.commits}</span>
                      <span className={team.contacts}>
                        <a href={"https://github.com/" + e.github_id}>
                          <i class="fab fa-github"></i>
                        </a>
                        <a href={"https://www.linkedin.com/in/" + e.linkedin}>
                          <i class="fab fa-linkedin"></i>
                        </a>
                        <a href={"mailto:" + e.email}>
                          <i class="fas fa-envelope"></i>
                        </a>
                      </span>
                      {/* <span className={team.speciality}>{e.github_id}</span> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
