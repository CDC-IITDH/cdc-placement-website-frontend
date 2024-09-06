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

  const [searchText, setSearchText] = useState("");

  const BATCH = [
    { id: 1, name: "2017", selected: true },
    { id: 2, name: "2020", selected: true },
    { id: 3, name: "2021", selected: true },
    { id: 4, name: "2022", selected: true },
    { id: 5, name: "2023", selected: true },
  ];

  const BRANCH = [
    { id: 1, name: "CSE", selected: true },
    { id: 2, name: "EE", selected: true },
    { id: 3, name: "MMAE", selected: true },
    { id: 4, name: "EP", selected: true },
    { id: 5, name: "CIVIL", selected: true },
    { id: 6, name: "CHEMICAL", selected: true },
    { id: 7, name: "MNC", selected: true },
  ];
  const DEGREE = [
    { id: 1, name: "Btech", selected: true },
    { id: 2, name: "MS", selected: true },
    { id: 3, name: "MTech", selected: true },
    { id: 4, name: "PHD", selected: true },
    { id: 5, name: "BSMS", selected: true },
  ];

  const STATUS = [
    { id: 1, name: "Applied", selected: true },
    { id: 2, name: "Selected", selected: true },
    { id: 3, name: "Rejected", selected: true },
  ];

  const [filterOptionsBatch, setFilterOptionsBatch] = useState(BATCH);
  const [filterOptionsBranch, setFilterOptionsBranch] = useState(BRANCH);
  const [filterOptionsStatus, setFilterOptionsStatus] = useState(STATUS);
  const [filterOptionsDegree, setFilterOptionsDegree] = useState(DEGREE);

  const resetCheckboxes = () => {
    setFilterOptionsBatch(BATCH);
    setFilterOptionsBranch(BRANCH);
    setFilterOptionsStatus(STATUS);
    setFilterOptionsDegree(DEGREE);
  };

  const getApplicationsInfo = () => {
    if (token) {
      GetApplications(token, openingId, openingType)
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
    if (!dashboardInfo[0]) {
      return;
    }
    let reqJob = [];
    if (dashboardInfo && dashboardInfo[0]?.ongoing.length !== 0) {
      reqJob = dashboardInfo[0]?.ongoing.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (
      reqJob.length === 0 &&
      dashboardInfo[0] &&
      dashboardInfo[0]?.previous.length !== 0
    ) {
      reqJob = dashboardInfo[0]?.previous.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (
      reqJob.length === 0 &&
      dashboardInfo &&
      dashboardInfo[0]?.new.length !== 0
    ) {
      reqJob = dashboardInfo[0]?.new.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (
      reqJob.length === 0 &&
      dashboardInfo && 
      dashboardInfo[0]?.ongoing_internships.length !== 0
    ) {
      reqJob = dashboardInfo[0]?.ongoing_internships.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (
      reqJob.length === 0 &&
      dashboardInfo[0] &&
      dashboardInfo[0]?.previous_internships.length !== 0
    ) {
      reqJob = dashboardInfo[0]?.previous_internships.filter((elem) => {
        return elem.id === openingId;
      });
    }
    if (
      reqJob.length === 0 &&
      dashboardInfo &&
      dashboardInfo[0]?.new_internships.length !== 0
    ) {
      reqJob = dashboardInfo[0]?.new_internships.filter((elem) => {
        return elem.id === openingId;
      });
    }
    setreqJobPosting(...reqJob);

    setShowLoader(false);
  }, [dashboardInfo, openingId]);

  return (
    <div className={classes.container}>
      <Details
        opening={reqJobPosting}
        setShowLoader={setShowLoader}
        token={token}
        getDashboardInfo={getDashboardInfo}
        type={openingType}
        setError={setError}
        setShowError={setShowError}
        setSuccess={setSuccess}
        setShowSuccess={setShowSuccess}
      />
      <div className={classes.rightContainer}>
        <Header
          studentsApplied={studentsApplied}
          countStudentsSelected={countStudentsSelected}
          token={token}
          openingId={openingId}
          openingType={openingType}
          reqJobPosting={reqJobPosting}
          setError={setError}
          setShowError={setShowError}
          setSuccess={setSuccess}
          setShowSuccess={setShowSuccess}
          getApplicationsInfo={getApplicationsInfo}
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptionsBatch={filterOptionsBatch}
          setFilterOptionsBatch={setFilterOptionsBatch}
          filterOptionsBranch={filterOptionsBranch}
          setFilterOptionsBranch={setFilterOptionsBranch}
          filterOptionsDegree={filterOptionsDegree} 
          setFilterOptionsDegree={setFilterOptionsDegree} 
          filterOptionsStatus={filterOptionsStatus}
          setFilterOptionsStatus={setFilterOptionsStatus}
          resetCheckboxes={resetCheckboxes}
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
          searchText={searchText}
          filterOptionsBatch={filterOptionsBatch}
          filterOptionsBranch={filterOptionsBranch}
          filterOptionsDegree={filterOptionsDegree}
          filterOptionsStatus={filterOptionsStatus}
          setFilterOptionsStatus={setFilterOptionsStatus}
        />
      </div>
    </div>
  );
};

export default DetailsPage;