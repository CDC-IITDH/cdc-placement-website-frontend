import { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Dashboard.css";
import Cards from "./Cards";
import { Container } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { Fragment } from "react";
import ApplicationCard from "./ApplicationCard";

const Dashboard = ({
  dashboardInfo,
  auth,
  setShowLoader,
  profileInfo,
  token,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  getDashboardInfo,
}) => {
  const [isloading, setIsloading] = useState(true);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [applStatus, setApplStatus] = useState(new Map());
  const [internship_appliedIds, setInternship_appliedIds] = useState(new Set());
  const [internship_applStatus, setInternship_applStatus] = useState(new Map());

  useEffect(() => {
    if (dashboardInfo[0]) {
      const ids = new Set();
      const status = new Map();
      const internship_ids = new Set();
      const internship_status = new Map();

      dashboardInfo[0]?.placementApplication.forEach((elem) => {
        ids.add(elem.placement.id);
        status.set(elem.placement.id, elem.selected);
      });
      dashboardInfo[0]?.internshipApplication.forEach((elem) => {
        internship_ids.add(elem.internship.id);
        internship_status.set(elem.internship.id, elem.selected);
      });
      setAppliedIds(ids);
      setApplStatus(status);
      setInternship_appliedIds(internship_ids);
      setInternship_applStatus(internship_status);
      setIsloading(false);
      setShowLoader(false);
    }
  }, [dashboardInfo, setShowLoader]);

  if (dashboardInfo[0]) {
    if (!auth) {
      return <Redirect to="/" />;
    } else {
      return isloading ? (
        <div className="loader-container">
          <div className="loader" />
        </div>
      ) : (
        <div className="Dashboard">
          <div className="Listing">
            <Tabs
              defaultActiveKey={
                profileInfo?.can_apply ? "placements" : "internships"
              }
            >
              {profileInfo?.can_apply && (
                <Tab eventKey="placements" title="Placements">
                  {dashboardInfo[0] &&
                  dashboardInfo[0]?.placements.length === 0 ? (
                    <Container>
                      <h4 style={{ color: "#787878" }}>
                        No Listings Available
                      </h4>
                    </Container>
                  ) : (
                    <Fragment>
                      {dashboardInfo[0]?.placements.map((elem) => {
                        const hasApplied = appliedIds.has(elem.id)
                          ? true
                          : false;
                        let selectionStatus = hasApplied
                          ? applStatus.get(elem.id)
                          : null;
                        return (
                          <Cards
                            key={elem.id}
                            id={elem.id}
                            token={token}
                            company={elem.company_name}
                            compensation={elem.compensation_CTC}
                            description={elem.description}
                            designation={elem.designation}
                            deadline_datetime={elem.deadline_datetime}
                            additional_info={elem.additional_info}
                            type="placements"
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
                      })}
                    </Fragment>
                  )}
                </Tab>
              )}
              {profileInfo?.can_apply_internship && (
                <Tab eventKey="internships" title="Internships">
                  {dashboardInfo[0] &&
                  dashboardInfo[0]?.internships.length === 0 ? (
                    <Container>
                      <h4 style={{ color: "#787878" }}>
                        No Listings Available
                      </h4>
                    </Container>
                  ) : (
                    <Fragment>
                      {dashboardInfo[0]?.internships.map((elem) => {
                        const hasApplied = internship_appliedIds.has(elem.id)
                          ? true
                          : false;
                        let selectionStatus = hasApplied
                          ? internship_applStatus.get(elem.id)
                          : null;
                        return (
                          <Cards
                            key={elem.id}
                            id={elem.id}
                            token={token}
                            company={elem.company_name}
                            compensation={elem.stipend}
                            description={elem.description}
                            designation={elem.designation}
                            deadline_datetime={elem.deadline_datetime}
                            additional_info={elem.additional_info}
                            type="internships"
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
                      })}
                    </Fragment>
                  )}
                </Tab>
              )}

              {profileInfo?.can_apply || profileInfo?.can_apply_internship ? (
                <Tab eventKey="applied" title="Your Applications">
                  {dashboardInfo[0] &&
                  dashboardInfo[0].placementApplication.length === 0 && dashboardInfo[0].internshipApplication.length===0 ? (
                    <Container>
                      <h4 style={{ color: "#787878" }}>
                        No Listings Available
                      </h4>
                    </Container>
                  ) : (
                    <Fragment>
                      {dashboardInfo[0]?.placementApplication.map((elem) => {
                        return (
                          <ApplicationCard
                            key={elem.id}
                            id={elem.id}
                            company={elem.placement.company_name}
                            deadline_datetime={
                              new Date(elem.placement.deadline_datetime)
                            }
                            token={token}
                            resume={elem.resume_link}
                            type="placements"
                            additional_info={elem.additional_info}
                            selected={elem.selected}
                            setError={setError}
                            setShowError={setShowError}
                            setSuccess={setSuccess}
                            setShowSuccess={setShowSuccess}
                            setShowLoader={setShowLoader}
                            getDashboardInfo={getDashboardInfo}
                          />
                        );
                      })}
                      {dashboardInfo[0]?.internshipApplication.map((elem) => {
                        return (
                          <ApplicationCard
                            key={elem.id}
                            id={elem.id}
                            company={elem.internship.company_name}
                            deadline_datetime={
                              new Date(elem.internship.deadline_datetime)
                            }
                            token={token}
                            resume={elem.resume_link}
                            type="internships"
                            additional_info={elem.additional_info}
                            selected={elem.selected}
                            setError={setError}
                            setShowError={setShowError}
                            setSuccess={setSuccess}
                            setShowSuccess={setShowSuccess}
                            setShowLoader={setShowLoader}
                            getDashboardInfo={getDashboardInfo}
                          />
                        );
                      })}
                    </Fragment>
                  )}
                </Tab>
              ) : (
                " "
              )}
            </Tabs>
          </div>
        </div>
      );
    }
  } else {
    return "";
  }
};

export default Dashboard;
