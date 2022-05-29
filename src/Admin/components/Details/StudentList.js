import useStyles from "./styles";
import React,{ useState} from "react";
import StudentCard from "./StudentCard";
import { Grid, Typography } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StudentList = ({ applicationsInfo, reqJobPosting, token, setError, setShowError, setSuccess, setShowSuccess, setShowLoader,
  openingId, getApplicationsInfo }) => {
  const classes = useStyles();
  console.log(applicationsInfo);

  //paginations
  const [page, setPage] = React.useState(1);
  const usersPerPage = 6;
  const pagesVisited = (page-1) * usersPerPage;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

let  length=applicationsInfo?applicationsInfo.applications.length:0;
const pageCount = Math.ceil( length/ usersPerPage);


  return (
    <div className={classes.studentCardContainer}>
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
          applicationsInfo&& applicationsInfo.applications.slice(pagesVisited,pagesVisited+usersPerPage).map((elem) => {
            return (
              <Grid   key={elem.id} item xs={6} s={6} md={6} lg={4}>
                <StudentCard
                  name={elem.student_details.name}
                  batch={elem.student_details.batch}
                  branch={elem.student_details.branch}
                  roll_no={elem.student_details.roll_no}
                  student_id = {elem.student}
                  selected={elem.selected}
                  opening_id={openingId}
                  resume_list = {elem.student_details.resume_list}
                  additional_info = {elem.additional_info}
                  token = {token}
                  reqJobPosting = {reqJobPosting}
                  application_id = {elem.id}
                  resume = {elem.resume_link}
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
       {applicationsInfo&& (
         <div style={{margin: 'auto'}}>
      <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
         </div>
       )
  }
      
      </Grid>
    </div>
  );
};

export default StudentList;
