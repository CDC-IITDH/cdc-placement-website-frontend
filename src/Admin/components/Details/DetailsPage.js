import { useState, useEffect } from "react";
import Details from "./Details";
import Header from "./Header";
import useStyles from "./styles";
import { GetApplications } from "../../api/details_page";
import StudentList from "./StudentList";

const DetailsPage = ({
  dashboardInfo,
  auth,
  match,
  token,
  setShowLoader,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  getDashboardInfo,
  setAuth,
  setToken,
}) => {
  const classes = useStyles();
  const [applicationsInfo, setapplicationsInfo] = useState(null);
  const [openingId, setopeningId] = useState(null);
  const [openingType, setopeningType] = useState(null);
  const [studentsApplied, setstudentsApplied] = useState(0);
  const [reqJobPosting, setreqJobPosting] = useState(null);
  const [countStudentsSelected, setCountStudentSelected] = useState(0);


  const getApplicationsInfo = () => {
    if (token) {
      GetApplications(token, openingId)
        .then((res) => {
          const data = res;
          setapplicationsInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setopeningId(match.params.id);
    setopeningType(match.params.type);
    getApplicationsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match, token, openingId]);

  useEffect(() => {
    if (applicationsInfo && applicationsInfo.applications) {
      setstudentsApplied(applicationsInfo.applications.length);
      setCountStudentSelected(
        applicationsInfo.applications.filter((obj) => {
          if (obj.selected === true) return true;
          else return false;
        }).length
      );
    }
  }, [applicationsInfo]);

  useEffect(() => {
    console.log(!dashboardInfo[0]);
    if (!dashboardInfo[0]){
      return ;
    }
    let reqJob = [];
    if (dashboardInfo && dashboardInfo[0]?.ongoing.length !== 0) {
      reqJob = dashboardInfo[0]?.ongoing.filter((elem) => {
        return elem.id === openingId;
      });
    }
    console.log(reqJob);
    console.log(dashboardInfo);
    if (reqJob.length === 0 && dashboardInfo[0] && dashboardInfo[0]?.previous.length !== 0) {
      reqJob = dashboardInfo[0]?.previous.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (reqJob.length === 0 && dashboardInfo && dashboardInfo[0]?.new.length !== 0) {
      reqJob = dashboardInfo[0]?.new.filter((elem) => {
        return elem.id === openingId;
      });
    }
    setreqJobPosting(...reqJob);

    setShowLoader(false);
  }, [dashboardInfo, openingId]);


  
  return (
    <div className={classes.container}>
      <Details opening={reqJobPosting} setShowLoader = {setShowLoader} token ={token} getDashboardInfo={getDashboardInfo} type={openingType}/>
      <div className={classes.rightContainer}>
        <Header
          studentsApplied={studentsApplied}
          countStudentsSelected={countStudentsSelected}
          token={token}
          openingId={openingId}
          reqJobPosting={reqJobPosting}
          setError={setError}
          setShowError={setShowError}
          setSuccess={setSuccess}
          setShowSuccess={setShowSuccess}
          getApplicationsInfo={getApplicationsInfo}
        />
        <StudentList 
        applicationsInfo={applicationsInfo} 
        reqJobPosting={reqJobPosting} 
        token={token}
        openingId={openingId}
        setError={setError}
        setShowError={setShowError}
        setSuccess={setSuccess}
        setShowSuccess={setShowSuccess}
        setShowLoader={setShowLoader}
        getApplicationsInfo={getApplicationsInfo}
        
        />
      </div>
    </div>
  );
};

export default DetailsPage;
