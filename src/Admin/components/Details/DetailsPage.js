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
  setdashboardInfo,
}) => {
  const classes = useStyles();
  const [applicationsInfo, setapplicationsInfo] = useState(null);
  const [openingId, setopeningId] = useState(null);
  const [studentsApplied, setstudentsApplied] = useState(0);
  const [reqJobPosting, setreqJobPosting] = useState(null);
  const [selectedStudents, setselectedStudents] = useState(0);

  const getApplicationsInfo = () => {
    if (token) {
      GetApplications(token, openingId)
        .then((res) => {
          const data = res;
          setapplicationsInfo(data);
          setselectedStudents(
            data?.applications?.filter((elem) => elem.selected === true).length
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setopeningId(match.params.id);
    getApplicationsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match, token, openingId]);

  useEffect(() => {
    if (applicationsInfo != null && applicationsInfo.message === "Data Found") {
      setstudentsApplied(applicationsInfo.applications.length);
    }
  }, [applicationsInfo]);

  useEffect(() => {
    let reqJob = [];
    if (dashboardInfo && dashboardInfo[0]?.ongoing.length !== 0) {
      reqJob = dashboardInfo[0]?.ongoing.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (
      reqJob &&
      reqJob.length === 0 &&
      dashboardInfo[0]?.previous.length !== 0
    ) {
      reqJob = dashboardInfo[0]?.previous.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (reqJob) {
      setreqJobPosting(...reqJob);
    }
  }, [dashboardInfo, openingId]);

  return (
    <div className={classes.container}>
      <Details
        reqJobPosting={reqJobPosting}
        openingId={openingId}
        token={token}
        setdashboardInfo={setdashboardInfo}
      />
      <div className={classes.rightContainer}>
        <Header
          studentsApplied={studentsApplied}
          token={token}
          openingId={openingId}
          reqJobPosting={reqJobPosting}
          selectedStudents={selectedStudents}
        />
        <StudentList
          openingId={openingId}
          applicationsInfo={applicationsInfo}
          token={token}
          setapplicationsInfo={setapplicationsInfo}
          setselectedStudents={setselectedStudents}
          selectedStudents={selectedStudents}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
