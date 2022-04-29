import {useEffect, useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { App as Student } from "./Student/App";
import { App as Admin } from "./Admin/App";
import UserSwitch from "./components/UserSwitch/UserSwitch";
import Loader from "./components/Loader/Loader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import JNF from "./Admin/components/JNF/JNF";
import VerifyEmail from "./Admin/components/VerifyEmail/VerifyEmail";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const App = () => {
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [currentUserType, setCurrentUserType] = useState(null);
    const [userTypes, setUserTypes] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

  const handleErrorClose = () => {
    setError(null);
    setShowError(false);
  };

  const handleSuccessClose = () => {
    setSuccess(null);
    setShowSuccess(false);
  };

  return (
    <>
      <Router>
        {showLoader ? <Loader /> : ""}
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <Alert onClose={handleErrorClose} severity='error'>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
        >
          <Alert onClose={handleSuccessClose} severity='success'>
            {success}
          </Alert>
        </Snackbar>

                {auth && currentUserType ? (
                    <Switch>
                        <Route
                            path='/student/'
                            render={() => {
                                if (
                                    currentUserType !== null &&
                                    currentUserType === "student" &&
                                    userTypes.includes(currentUserType)
                                )
                                    return (
                                        <Student
                                            auth={auth}
                                            token={token}
                                            setAuth={setAuth}
                                            setToken={setToken}
                                            setCurrentUserType={setCurrentUserType}
                                            setShowLoader={setShowLoader}
                                            setError={setError}
                                            setShowError={setShowError}
                                            setSuccess={setSuccess}
                                            setShowSuccess={setShowSuccess}
                                        />
                                    );
                                else return <Redirect to='/'/>;
                            }}
                        />

                        <Route
                            path='/admin/'
                            render={() => {
                                if (
                                    currentUserType !== null &&
                                    currentUserType === "admin" &&
                                    userTypes.includes(currentUserType)
                                )
                                    return (
                                        <Admin
                                            auth={auth}
                                            token={token}
                                            setAuth={setAuth}
                                            setToken={setToken}
                                            setCurrentUserType={setCurrentUserType}
                                            setShowLoader={setShowLoader}
                                            setError={setError}
                                            setShowError={setShowError}
                                            setSuccess={setSuccess}
                                            setShowSuccess={setShowSuccess}
                                        />
                                    );
                                else return <Redirect to='/'/>;
                            }}
                        />

                        <Route
                            exact
                            path='*'
                            render={() => {
                                if (currentUserType === "student") {
                                    return <Redirect to='/student'/>;
                                } else if (currentUserType === "admin") {
                                    return <Redirect to='/admin'/>;
                                } else {
                                    setCurrentUserType(null);
                                }
                            }}
                        />
                    </Switch>
                ) : (
                    <div>

                        {auth ? (
                            <div>
                             <Navbar auth={auth} setAuth={setAuth} setToken={setToken}/>
                            <UserSwitch
                                userTypes={userTypes}
                                setAuth={setAuth}
                                currentUserType={currentUserType}
                                setCurrentUserType={setCurrentUserType}
                                auth={auth}
                                setShowLoader={setShowLoader}
                                setError={setError}
                                setShowError={setShowError}
                            />
                                </div>
                        ) : (
                            <Switch>
                                <Route
                                    path='/jnf'
                                    render={() => {
                                        return (
                                            // Return jnf component
                                            <JNF
                                                setShowLoader={setShowLoader}
                                            />
                                        );

                                    }}
                                />
                                <Route
                                    path='/company/verifyemail'
                                     render={() => {
                                        return (
                                        <VerifyEmail
                                        setShowLoader={setShowLoader}
                                        setError={setError}
                                        />
                                        )}
                                }
                                />
                                <Route
                                    exact
                                    path='*'
                                    render={() => {
                                        return (
                                            <div>
                             <Navbar auth={auth} setAuth={setAuth} setToken={setToken}/>
                                            <Login
                                                auth={auth}
                                                setAuth={setAuth}
                                                setToken={setToken}
                                                setUserTypes={setUserTypes}
                                                setShowLoader={setShowLoader}
                                                setError={setError}
                                                setShowError={setShowError}
                                            />
                                            </div>
                                        );
                                    }}
                                />
                            </Switch>
                        )}
                    </div>
                )}
            </Router>
        </>
    );
};

export default App;
