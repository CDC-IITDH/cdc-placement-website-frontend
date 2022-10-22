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
    selection_status: false,
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
          return(elem.id.toString() === match.params.id.toString())
        }
      );
      if (desc.length === 0) {

        desc = dashboardInfo[0]['placementApplication'].filter(
            (elem) => {
              return (elem.id.toString() === match.params.id.toString())
            }
        );
        for (let i = 0; i < desc.length; i++) {
          desc[i] = desc[i]['placement'];
        }
      }
      if (desc.length !== 0) {
        setDesc(desc);
        if (infoType === "internships") {
          for (
            let i = 0;
            i < dashboardInfo[0].internshipApplication.length;
            i++
          ) {
            if (
              dashboardInfo[0].internshipApplication[i].internship.toString() ===
              match.params.id.toString() && selectionStatus.resume_selected === null
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
                (dashboardInfo[0].placementApplication[i].id.toString() ===
              match.params.id.toString() ||  dashboardInfo[0].placementApplication[i]['placement'].id.toString() ===
              match.params.id.toString()) && selectionStatus.resume_selected === null
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
        window.location.href = "/dashboard";
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
              designation={elem.designation}
              company_name={elem.company_name}
              company_type={elem.company_type}
              company_address={elem.address}
              bond_details={elem.bond_details}
              company_details = {elem.company_details}
              company_details_pdf_links = {elem.company_details_pdf_links}
              is_company_details_pdf={elem.is_company_details_pdf}
              compensation_CTC={elem.compensation_CTC}
              compensation_bonus={elem.compensation_bonus}
              compensation_gross={elem.compensation_gross}
              compensation_take_home={elem.compensation_take_home}
              compensation_pdf_links={elem.compensation_pdf_links}
              is_compensation_details_pdf={elem.is_compensation_details_pdf}
              compensation_details={elem.compensation_details}
              description={elem.description}
              description_pdf_links = {elem.description_pdf_links}
              is_description_pdf={elem.is_description_pdf}
              tier={elem.tier}
              start_date={elem.tentative_date_of_joining}
              allowed_branch={elem.allowed_branch}
              allowed_batch={elem.allowed_batch}
              website={elem.website}
              selection_procedure={elem.selection_procedure_rounds}
              selection_procedure_details={elem.selection_procedure_details}
              selection_procedure_details_pdf_links={elem.selection_procedure_details_pdf_links}
              is_selection_procedure_details_pdf={elem.is_selection_procedure_details_pdf}
              pin_code={elem.pin_code}
              nature_of_business={elem.nature_of_business}
              other_requirements={elem.other_requirements}
              tentative_no_of_offers={elem.tentative_no_of_offers}
              attachments={elem.attachments}
              additional_info={elem.additional_info}
              city={elem.city}
              city_type={elem.city_type}
              country={elem.country}
              created_at={elem.created_at}
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
