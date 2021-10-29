import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import { GetDashboard, GetProfile } from "./api/dashboard";
import Description from "./components/Dashboard/Description/Description";
import JobDescription from "../components/JobDescription/JobDescription.js";

const App = ({
  auth,
  token,
  setAuth,
  setToken,
  setCurrentUserType,
  setShowLoader,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
}) => {
  const [dashboardInfo, setdashboardInfo] = useState(null);
  const [profileInfo, setprofileInfo] = useState(null);
  const [showProfile, setShowProile] = useState(false);

  const getDashboardInfo = () => {
    if (token) {
      GetDashboard(token)
        .then((res) => {
          const data = res;
          setdashboardInfo(data);
        })
        .catch((err) => {
          setAuth(false);
          setToken(null);
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getDashboardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth, setToken, token]);

  const getProfileInfo = () => {
    if (token) {
      GetProfile(token)
        .then((res) => {
          const data = res;
          setprofileInfo(data.details);
        })
        .catch((err) => {
          setAuth(false);
          setToken(null);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getProfileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth, setToken, token]);

  return (
    <>
      <Router>
        <Navbar
          auth={auth}
          setAuth={setAuth}
          setToken={setToken}
          setCurrentUserType={setCurrentUserType}
          setShowProfile={setShowProile}
        />
        {showProfile ? (
          <Profile
            profileInfo={profileInfo}
            getProfileInfo={getProfileInfo}
            auth={auth}
            token={token}
            setShowLoader={setShowLoader}
            setShowProfile={setShowProile}
            setError={setError}
            setShowError={setShowError}
            setSuccess={setSuccess}
            setShowSuccess={setShowSuccess}
          />
        ) : (
          ""
        )}
        {auth ? (
          <Switch>
            <Route
              exact
              path="/student/dashboard/:type/:id"
              render={({ match }) => (
                <Description
                  profileInfo={profileInfo}
                  dashboardInfo={[dashboardInfo]}
                  match={match}
                  auth={auth}
                  token={token}
                  setShowLoader={setShowLoader}
                  setError={setError}
                  setShowError={setShowError}
                  setSuccess={setSuccess}
                  setShowSuccess={setShowSuccess}
                  getDashboardInfo={getDashboardInfo}
                />
              )}
            />
            <Route
              exact
              path="/student"
              render={() => (
                <>
                  {/* <Dashboard
                    profileInfo={profileInfo}
                    dashboardInfo={[dashboardInfo]}
                    auth={auth}
                    token={token}
                    setShowLoader={setShowLoader}
                    setError={setError}
                    setShowError={setShowError}
                    setSuccess={setSuccess}
                    setShowSuccess={setShowSuccess}
                    getDashboardInfo={getDashboardInfo}
                  /> */}
                  <JobDescription/>
                </>
              )}
            />
            <Route exact path="*" render={() => <Redirect to="/student" />} />
          </Switch>
        ) : (
          <Redirect to="/" />
        )}
      </Router>
    </>
  );
};

export { App };
