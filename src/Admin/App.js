import {useEffect, useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import DetailsPage from "./components/Details/DetailsPage";
import {GetDashboard} from "./api/dashboard";
import AddPPOModal from "./components/AddPPOModal/AddPPOModal";
import Description from "./components/Description/Description";
import ShowTables from "./components/stats";

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
    const [showModal, setShowModal] = useState(false);
    const [ModalType, setModalType] = useState("");

    const getDashboardInfo = () => {
        if (token) {
            setShowLoader(true);
            GetDashboard(token)
                .then((res) => {
                    const data = res;
                    setdashboardInfo(data);
                    setShowLoader(false);
                })
                .catch((err) => {
                    setAuth(false);
                    setToken(null);
                });
        }
    };

    useEffect(() => {

        getDashboardInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAuth, setToken, token]);

    return (
        <>
            <Router basename="portal">
                <Navbar
                    auth={auth}
                    setAuth={setAuth}
                    setToken={setToken}
                    setCurrentUserType={setCurrentUserType}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    ModalType={ModalType}
                    setModalType={setModalType}
                />

                {auth ? (
                    <Switch>
                        {
                            showModal ? (
                                    ModalType === "addPPO" ? (
                                        <AddPPOModal
                                            token={token}
                                            showModal={showModal}
                                            setShowModal={setShowModal}
                                            ModalType={ModalType}
                                            setModalType={setModalType}
                                            setShowLoader={setShowLoader}
                                            setError={setError}
                                            setShowError={setShowError}
                                            setSuccess={setSuccess}
                                            setShowSuccess={setShowSuccess}
                                        />
                                    ) : ""

                                )


                                : ""
                        }
                        <Route
                            exact
                            path='/admin/details/:type/:id'
                            render={({match}) => (
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
                            path='/admin/description/:type/:id'
                            render={({match}) => (
                                <Description
                                    // profileInfo={profileInfo}
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
                        <Route exact path='/admin/statistics' render={()=>(
                            <ShowTables
                                token={token}
                                setShowLoader={setShowLoader}
                                setError={setError}
                                setShowError={setShowError}
                                setSuccess={setSuccess}
                                setShowSuccess={setShowSuccess}
                                />
                        )
                        }/>

                        <Route exact path='*' render={() => <Redirect to='/admin'/>}/>


                    </Switch>
                ) : (
                    <Redirect to='/'/>
                )}
            </Router>
        </>
    );
};

export {App};
