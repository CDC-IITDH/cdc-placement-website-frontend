import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import useStyles from "./styles";
import { Redirect } from "react-router-dom";

const Description = ({
  dashboardInfo,
  auth,
  match,
  setShowLoader,
  profileInfo,
  token,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  getDashboardInfo
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [selectionStatus, setSelectionStatus] = useState({
    selection_status: null,
    resume_selected: null,
    additional_details: null,
  });

  useEffect(() => {
    if (
      dashboardInfo[0] !== null &&
      dashboardInfo[0].message === "Data Found"
    ) {
      const infoType = match.params.type;
      let desc = dashboardInfo[0][infoType].filter(
        (elem) => {
          return(toString(elem.id) === toString(match.params.id))
        }
      );
      if (desc.length !== 0) {
        setDesc(desc);
        if (infoType === "internships") {
          for (
            let i = 0;
            i < dashboardInfo[0].internshipApplication.length;
            i++
          ) {
            if (
              toString(dashboardInfo[0].internshipApplication[i].internship) ===
              toString(match.params.id) && selectionStatus.resume_selected === null
            ) {
              setHasApplied(true);
              setSelectionStatus({
                ...selectionStatus,
                selection_status:
                  dashboardInfo[0].internshipApplication[i].selected,
                resume_selected:
                  dashboardInfo[0].internshipApplication[i].resume,
                additional_details:
                  dashboardInfo[0].internshipApplication[i].additional_info,
              });
            }
          }
        } else {
          for (
            let i = 0;
            i < dashboardInfo[0].placementApplication.length;
            i++
          ) {
            if (
              toString(dashboardInfo[0].placementApplication[i].placement) ===
              toString(match.params.id)&& selectionStatus.resume_selected === null
            ) {
              setHasApplied(true);
              setSelectionStatus({
                ...selectionStatus,
                selection_status:
                  dashboardInfo[0].placementApplication[i].selected,
                resume_selected:
                  dashboardInfo[0].placementApplication[i].resume,
                additional_details:
                  dashboardInfo[0].placementApplication[i].additional_info,
              });
            }
          }
        }
      } else {
        alert("Searched url does not match anything.");
      }
      setLoading(false);
      setShowLoader(false);
    }
  }, [dashboardInfo, match, setShowLoader, selectionStatus ]);

  if (dashboardInfo[0] && profileInfo) {
    if (!auth) {
      return <Redirect to='/' />;
    } else {
      return loading ? (
        <div className={classes.loaderContainer}>
          <div className={classes.loader} />
        </div>
      ) : (
        desc.map((elem) => {
          return (
            <JobCard
              key={elem.id}
              id={elem.id}
              token={token}
              type={match.params.type}
              rounds_details={elem.rounds_details}
              designation={elem.designation}
              company_name={elem.company_details.name}
              company_type={elem.company_details.companyType}
              company_address={elem.company_details.address}
              company_contact_name={elem.company_details.contact_person_name}
              company_phone={elem.company_details.phone_number}
              description={elem.description}
              status={elem.status}
              start_date={elem.start_date}
              compensation={elem.compensation}
              compensation_details={elem.compensation_details}
              allowed_branch={elem.allowed_branch}
              allowed_batch={elem.allowed_batch}
              website={elem.company_details.website}
              rounds={elem.rounds}
              attachments={elem.attachments}
              additional_info={elem.additional_info}
              city={elem.city}
              city_type={elem.city_type}
              co_op={match.params.type === "internships" ? elem.co_op : ""}
              duration={
                match.params.type === "internships" ? elem.duration : ""
              }
              profileInfo={profileInfo}
              hasApplied={hasApplied}
              selectionStatus={selectionStatus}
              setError={setError}
              setShowError={setShowError}
              setSuccess={setSuccess}
              setShowSuccess={setShowSuccess}
              setShowLoader={setShowLoader}
              getDashboardInfo={getDashboardInfo}
            />
          );
        })
      );
    }
  } else {
    return "";
  }
};

export default Description;
