import useStyles from "./styles";
import React, { useEffect } from "react";
import StudentCard from "./StudentCard";
import { Grid, Typography } from "@material-ui/core";

const StudentList = ({
  applicationsInfo,
  openingId,
  token,
  setapplicationsInfo,
  selectedStudents,
  setselectedStudents,
  setShowLoader,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
}) => {
  const classes = useStyles();

  console.log(applicationsInfo);

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
          applicationsInfo?.applications.map((elem) => {
            return (
              <Grid key={elem.id} item xs={6} s={6} md={6} lg={4}>
                <StudentCard
                  setapplicationsInfo={setapplicationsInfo}
                  selected={elem.selected}
                  token={token}
                  openingId={openingId}
                  roll_no={elem.student_details.roll_no}
                  name={elem.student_details.name}
                  batch={elem.student_details.batch}
                  branch={elem.student_details.branch}
                  setselectedStudents={setselectedStudents}
                  setShowLoader={setShowLoader}
                  setError={setError}
                  setShowError={setShowError}
                  setSuccess={setSuccess}
                  setShowSuccess={setShowSuccess}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default StudentList;
