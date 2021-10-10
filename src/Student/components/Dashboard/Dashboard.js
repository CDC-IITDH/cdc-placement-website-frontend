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
  getDashboardInfo
}) => {
  const [isloading, setIsloading] = useState(true);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [applStatus, setApplStatus] = useState(new Map());

  useEffect(() => {
    if (dashboardInfo[0]) {
      dashboardInfo[0]?.placementApplication.forEach((elem) => {
        setAppliedIds((prev) => new Set(prev.add(elem.placement)));
        setApplStatus(new Map(applStatus.set(elem.placement, elem.selected)));
      });
      setIsloading(false);
      setShowLoader(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ dashboardInfo, setShowLoader]);

  if (dashboardInfo[0]) {
    if (!auth) {
      return <Redirect to='/' />;
    } else {
      return isloading ? (
        <div className='loader-container'>
          <div className='loader' />
        </div>
      ) : (
        <div className='Dashboard'>
          <h1>Dashboard</h1>

          <div className='Listing'>
            <Tabs defaultActiveKey='placements'>
          

              <Tab eventKey='placements' title='Placements'>
                {dashboardInfo[0] &&
                dashboardInfo[0]?.placements.length === 0 ? (
                  <Container>
                    <h4 style={{ color: "#787878" }}>No Listings Available</h4>
                  </Container>
                ) : (
                  <Fragment>
                    {dashboardInfo[0]?.placements.map((elem) => {
                      const hasApplied = appliedIds.has(elem.id) ? true : false;
                      let selectionStatus = hasApplied
                        ? applStatus.get(elem.id)
                        : null;
                      return (
                        <Cards
                          key={elem.id}
                          id={elem.id}
                          token={token}
                          company={elem.company_details.name}
                          compensation={elem.compensation}
                          description={elem.description}
                          designation={elem.designation}
                          start_date={elem.start_date}
                          additional_info={elem.additional_info}
                          type='placements'
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

              <Tab eventKey='applied' title='Applied'>
               
                {dashboardInfo[0] &&
                dashboardInfo[0]?.placementApplication.length === 0 ? (
                  <Container>
                    <h4 style={{ color: "#787878" }}>No Listings Available</h4>
                  </Container>
                ) : (
                  <Fragment>
                    {dashboardInfo[0]?.placementApplication.map((elem) => {
                      return (
                        <ApplicationCard
                          key={elem.id}
                          id={elem.id}
                          company={elem.company_details.name}
                          application_status={elem.application_status}
                          resume={elem.resume}
                          type='placements'
                          additional_info={elem.additional_info}
                          selected={elem.selected}
                        />
                      );
                    })}
                  </Fragment>
                )}
              </Tab>
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
