import { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Dashboard.css";
import { Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Fragment } from "react";
import Cards from "./Cards";
import { Button } from "react-bootstrap";

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
    // format time stamp to date
  const formatDate =  (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };
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
          <div style={{marginLeft:"5%"}}> 
            <Button href="/admin/jnf" style={{backgroundColor: "#334878", borderColor:"#334878"}}>Add Placement (JNF)</Button>
          </div>
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
                      // convert elem.deadline_timestamp to date dd/mm/yyyy
                      return (
                        <Cards
                          key={elem.id}
                          id={elem.id}
                          token={token}
                          company_name={elem.company_name}
                          compensation_CTC={elem.compensation_CTC}
                          description={elem.description}
                          designation={elem.designation}
                          end_date={formatDate(elem.deadline_datetime)}
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
                      console.log(elem.deadline_timestamp);
                      return (
                        <Cards
                          key={elem.id}
                          id={elem.id}
                          token={token}
                          company_name={elem.company_name}
                          compensation_CTC={elem.compensation_CTC}
                          description={elem.description}
                          designation={elem.designation}
                          end_date={formatDate(elem.deadline_datetime)}
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
