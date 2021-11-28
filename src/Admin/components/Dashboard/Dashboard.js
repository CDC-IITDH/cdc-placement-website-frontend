import { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Dashboard.css";
import { Redirect } from "react-router-dom";
import Searchbar from "../SearchBar/SearchBar";

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
          {dashboardInfo &&
            <Searchbar searchBarInfo={dashboardInfo[0]} />}
          <div className='Listing'>
            <Tabs defaultActiveKey='ongoing'>
              <Tab eventKey='ongoing' title='Ongoing'></Tab>
              <Tab eventKey='previous' title='Previous'></Tab>
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
