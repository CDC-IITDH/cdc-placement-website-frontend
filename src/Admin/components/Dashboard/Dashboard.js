import { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Dashboard.css";
import { Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Fragment } from "react";
import Cards from "./Cards";


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
  useEffect(() => {
    setIsloading(false);
    setShowLoader(false);
  }, [setShowLoader]);
  useEffect(() => { 
      setIsloading(false);
      setShowLoader(false);
    }, [ dashboardInfo, setShowLoader]);
    console.log(dashboardInfo);
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
            <Tabs defaultActiveKey='ongoing'>
              <Tab eventKey='ongoing' title='Ongoing'>
              {dashboardInfo[0] &&
                dashboardInfo[0]?.ongoing.length === 0 ? (
                  <Container>
                    <h4 style={{ color: "#787878" }}>No Listings Available</h4>
                  </Container>
                ) : (
                  <Fragment>
                    {dashboardInfo[0]?.ongoing.map((elem) => {
                      
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
                          tier={elem.tier}
                          contact_person_name = {elem.contact_person_name}
                          phone_number = {elem.phone_number}
                          email = {elem.email}
                          additional_info={elem.additional_info}
                          type='placements'
                          profileInfo={profileInfo}
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

              <Tab eventKey='previous' title='Previous'>
              {dashboardInfo[0] &&
                dashboardInfo[0]?.previous.length === 0 ? (
                  <Container>
                    <h4 style={{ color: "#787878" }}>No Listings Available</h4>
                  </Container>
                ) : (
                  <Fragment>
                    {dashboardInfo[0]?.previous.map((elem) => {
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
                          start_date={elem.start_date}
                          tier={elem.tier}
                          contact_person_name = {elem.contact_person_name}
                          phone_number = {elem.phone_number}
                          email = {elem.email}
                          additional_info={elem.additional_info}
                          type='placements'
                          profileInfo={profileInfo}
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
