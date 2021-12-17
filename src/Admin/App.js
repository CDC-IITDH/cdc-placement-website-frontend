import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import DetailsPage from "./components/Details/DetailsPage";
import { GetDashboard } from "./api/dashboard";
import JNF from "./components/JNF/JNF";

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

  return (
    <>
      <Router>
        <Navbar
          auth={auth}
          setAuth={setAuth}
          setToken={setToken}
          setCurrentUserType={setCurrentUserType}
        />

        {auth ? (
          <Switch>
            <Route
              exact
              path='/admin/details/:id'
              render={({ match }) => (
                <DetailsPage
                  dashboardInfo={[dashboardInfo]}
                  auth={auth}
                  match={match}
                  token={token}
                  setShowLoader={setShowLoader}
                  setError={setError}
                  setShowError={setShowError}
                  setSuccess={setSuccess}
                  setShowSuccess={setShowSuccess}
                  getDashboardInfo={getDashboardInfo}
                  setAuth={setAuth}
                  setToken={setToken}
                />
              )}
            />
            <Route
              exact
              path='/admin'
              render={() => (
                <Dashboard
                  dashboardInfo={[dashboardInfo]}
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
              path='/admin/jnf'
              render={() => (
                <JNF
                  setShowLoader={setShowLoader}
                />
              )}
            />
            <Route exact path='*' render={() => <Redirect to='/admin' />} />
          </Switch>
        ) : (
          <Redirect to='/' />
        )}
      </Router>
    </>
  );
};

export { App };
