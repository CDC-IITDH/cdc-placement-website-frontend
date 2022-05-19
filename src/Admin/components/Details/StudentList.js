import useStyles from './styles';
import React, {useState, useEffect} from 'react';
import StudentCard from './StudentCard';
import { Grid, Typography } from '@material-ui/core';

const StudentList = ({
  applicationsInfo,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  setShowLoader,
  openingId,
  token,
  getApplicationsInfo
}) => {
  const classes = useStyles();

  return (
    <div className={classes.studentCardContainer}>
      <Grid container spacing={2}>
        {applicationsInfo && applicationsInfo?.applications.length === 0 ? (
          <Grid item xs={12} s={12} md={12} lg={12}>
            <Typography
              style={{
                textAlign: 'center',
              }}
            >
              No Applications Received
            </Typography>
          </Grid>
        ) : (
          applicationsInfo?.applications.map((elem) => {
            return (
              <Grid key={elem.id} item xs={6} s={6} md={6} lg={4}>
                <StudentCard
                  name={elem['student_details'].name}
                  batch={elem['student_details'].batch}
                  branch={elem['student_details'].branch}
                  opening_id={openingId}
                  token={token}
                  student_id={elem.student}
                  selected={elem.selected}
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
    </div>
  );
};

export default StudentList;
