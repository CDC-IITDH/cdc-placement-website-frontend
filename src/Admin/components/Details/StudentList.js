import useStyles from "./styles";
import React from "react";
import StudentCard from "./StudentCard";
import { Grid, Typography } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";

const StudentList = ({
  applicationsInfo,
  openingType,
  reqJobPosting,
  token,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  setShowLoader,
  openingId,
  getApplicationsInfo,
  searchText,
  filterOptionsBatch,
  filterOptionsBranch,
  filterOptionsStatus,
  filterOptionsDegree
}) => {
  const classes = useStyles();

  //paginations
  const [page, setPage] = React.useState(1);
  const usersPerPage = 12;
  const pagesVisited = (page - 1) * usersPerPage;
  const handleChange = (event, value) => {
    setPage(value);
  };

  let displayApplications = applicationsInfo ? applicationsInfo.applications
      .filter((elem) => {
        const rollNo = elem.student_details.roll_no;
        return (
          elem.student_details.name.includes(searchText) ||
          (rollNo && rollNo.toString() === searchText)
        );
      })
      
      .filter((elem) => {
        return (
          (filterOptionsBatch.length === 0 ||
            filterOptionsBatch.some(
              (option) =>
                option.selected &&
                elem.student_details.batch === option.name
            )) &&
          (filterOptionsBranch.length === 0 ||
            filterOptionsBranch.some(
              (option) =>
                option.selected &&
                elem.student_details.branch === option.name
            )) &&
          (filterOptionsStatus.length === 0 ||
            filterOptionsStatus.some(
              (option) =>
                (option.selected && elem.selected === option.name) ||
                (option.name === "Applied" &&
                  option.selected &&
                  elem.selected === null) ||
                (option.name === "Selected" &&
                  option.selected &&
                  elem.selected === true) ||
                (option.name === "Rejected" &&
                  option.selected &&
                  elem.selected === false)
            )) && 
                      (filterOptionsDegree.length === 0 ||
            filterOptionsDegree.some(
              (option) =>
                option.selected &&
                elem.student_details.degree === option.name
            )) 
        );
      })
      .sort((e) => {
        if (e.selected) {
          return -1;
        } else {
          return 1;
        }
      })
       : [];
  let length = displayApplications.length;
  const pageCount = Math.ceil(length / usersPerPage);

  return (
    <div className={classes.studentCardContainer}>
      <Grid container spacing={4}>
        <Grid container spacing={2}>
          {applicationsInfo && applicationsInfo?.applications.length === 0 ? (
            <Grid item xs={12} s={12} md={12} lg={12}>
              <Typography
                style={{
                  textAlign: "center",
                }}
              >
                No students have applied
              </Typography>
            </Grid>
          ) : (
            displayApplications.slice(pagesVisited, pagesVisited + usersPerPage)
              .map((elem) => {
                return (
                  <Grid key={elem.id} item xs={6} s={6} md={6} lg={3}>
                    <StudentCard
                      name={elem.student_details.name}
                      batch={elem.student_details.batch}
                      branch={elem.student_details.branch}
                      roll_no={elem.student_details.roll_no}
                      phone_no={elem.student_details.phone_number}
                      student_id={elem.student}
                      selected={elem.selected}
                      opening_id={openingId}
                      opening_type={openingType}
                      resume_list={elem.student_details.resume_list}
                      additional_info={elem.additional_info}
                      token={token}
                      reqJobPosting={reqJobPosting}
                      application_id={elem.id}
                      resume={elem.resume_link}
                      setError={setError}
                      setShowError={setShowError}
                      setSuccess={setSuccess}
                      setShowSuccess={setShowSuccess}
                      setShowLoader={setShowLoader}
                      getApplicationsInfo={getApplicationsInfo}
                    />
                  </Grid>
                );
              })
          )}
        </Grid>
        {applicationsInfo && applicationsInfo?.applications.length !== 0 ? (
          <div style={{ margin: "auto", padding: "20px" }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              color="secondary"
            />
          </div>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default StudentList;
