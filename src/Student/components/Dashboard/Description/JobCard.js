import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import LinkIcon from "@material-ui/icons/Link";
import { Fragment, useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import Modale from "../../ApplyJob/Modale";

const JobCard = ({
  token,
  id,
  designation,
  company_name,
  company_type,
  company_address,
  description,
  status,
  start_date,
  compensation,
  allowed_branch,
  allowed_batch,
  website,
  rounds,
  rounds_details,
  compensation_details,
  type,
  co_op,
  city,
  city_type,
  duration,
  additional_info,
  profileInfo,
  hasApplied,
  selectionStatus,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  setShowLoader,
  getDashboardInfo,
}) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const openResume = () => {
    window.open(
      "https://www.nationalgeographic.com/mediakit/assets/img/downloads/2020/NGM_2020_Media_Kit.pdf"
    );
  };

  return (
    <Box className={classes.container}>
      <Grid direction="row-reverse" container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box className={classes.headingBox}>
            <Box>
              <Typography variant="h2">{company_name}</Typography>
              <Box style={{ marginTop: "10px" }}>
                <Typography
                  display="inline"
                  style={{ marginTop: "10px" }}
                  variant="h5"
                >
                  {designation}
                </Typography>
                <Typography
                  display="inline"
                  style={{ marginTop: "10px" }}
                  variant="h5"
                  color="textPrimary"
                >
                  {type === "internships" && co_op ? " (Co-Op)" : ""}
                </Typography>
              </Box>
              <Typography style={{ marginTop: "10px" }} variant="h6">
                {company_address}
              </Typography>
              {website.length > 0 && (
                <a href={website}>
                  <LinkIcon />
                </a>
              )}
            </Box>
            {hasApplied ? (
              selectionStatus.selection_status === null ? (
                <Box className={classes.buttonBox}>
                  <Box className={classes.buttonTextBox}>
                    <Typography
                      variant="body1"
                      className={classes.buttonTestBody1}
                    >
                      APPLIED
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.buttonTestBody2}
                    >
                      In Progress...
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box className={classes.buttonBox}>
                  <Box
                    className={`${classes.buttonTextBox} ${
                      selectionStatus.selection_status
                        ? classes.buttonTextAccepted
                        : classes.buttonTextRejected
                    }`}
                  >
                    <Typography
                      variant="body1"
                      className={classes.buttonTestBody1}
                    >
                      {selectionStatus.selection_status
                        ? "ACCEPTED"
                        : "REJECTED"}
                    </Typography>
                  </Box>
                </Box>
              )
            ) : (
              <Box className={classes.buttonBox}>
                <button
                  align="center"
                  className={classes.apply_job_button}
                  onClick={handleShow}
                >
                  Apply now
                </button>
              </Box>
            )}
          </Box>
          <Box className={classes.boxDivider}>
            <Divider component="h1" />
          </Box>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Status
                </Typography>
                <Typography variant="h5" component="h5">
                  {status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Start Date
                </Typography>
                {type === "internships" && duration ? (
                  <Typography variant="h5" component="h5">
                    {`${start_date} | ${duration} months`}
                  </Typography>
                ) : (
                  <Typography variant="h5" component="h5">
                    {start_date}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                {type === "internships" ? (
                  <Typography color="textSecondary" gutterBottom>
                    Compensation (per month)
                  </Typography>
                ) : (
                  <Typography color="textSecondary" gutterBottom>
                    Compensation (per annum)
                  </Typography>
                )}
                <Typography variant="h5" component="h5">
                  <span>&#8377;</span>
                  {` ${compensation.toLocaleString()}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Location | Location Type
                </Typography>
                <Typography variant="h5" component="h5">
                  {`${city} | ${city_type}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Allowed Branch
                </Typography>
                <Box className={classes.cardContainer}>
                  {allowed_branch.map((elem, index) => {
                    return (
                      <Card key={index} className={classes.branchCard}>
                        <Typography>{elem}</Typography>
                      </Card>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Allowed Batch
                </Typography>
                <Box className={classes.cardContainer}>
                  {allowed_batch.map((elem, index) => {
                    return (
                      <Card key={index} className={classes.batchCard}>
                        <Typography>{elem}</Typography>
                      </Card>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Box>
            {type === "internships" && co_op ? (
              <Box className={classes.coopBox}>
                <Box
                  className={`${classes.coopBoxElements} ${classes.infoIcon}`}
                >
                  <InfoIcon />
                </Box>
                <Box className={classes.coopBoxElements}>
                  <Typography className={classes.coopInfoTitle}>
                    Info:
                  </Typography>
                  <Typography>This is a Co-op internship</Typography>
                </Box>
              </Box>
            ) : null}
            <Typography
              style={{ margin: "0 0 5px" }}
              variant="h6"
            >{`Company-type: ${company_type}`}</Typography>
            <Typography
              className={classes.infoTitle}
              variant="h6"
            >{`Description:`}</Typography>
            <Typography variant="subtitle1">{description}</Typography>

            <Typography
              className={classes.infoTitle}
              variant="h6"
            >{`Rounds:`}</Typography>
            <div>
              <Stepper
                activeStep={rounds.indexOf(status)}
                orientation="vertical"
              >
                {rounds.map((label) => (
                  <Step expanded={true} key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{rounds_details[label] || ""}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>

            {compensation_details.length > 0 ? (
              <Fragment>
                <Typography
                  className={classes.infoTitle}
                  variant="h6"
                >{`Compensation Details:`}</Typography>
                <Typography variant="subtitle1">
                  {compensation_details}
                </Typography>
              </Fragment>
            ) : null}

            {hasApplied && (
              <Fragment>
                <Box className={classes.boxDivider}>
                  <Divider component="h1" />
                </Box>
                <Box className={classes.additionalDetailsBox}>
                  <Typography
                    className={classes.additionalDetailsHeading}
                    variant="h5"
                  >
                    Details filled:
                  </Typography>
                  {additional_info.map((elem, i) => {
                    return (
                      <Box key={i}>
                        <Typography
                          display="inline"
                          variant="body1"
                        >{`${capitalizeFirstLetter(elem)}:  `}</Typography>
                        <Typography
                          className={classes.fontBold}
                          display="inline"
                          variant="body1"
                        >
                          {selectionStatus.additional_details[elem]}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                <Box className={classes.resumeButton} onClick={openResume}>
                  <Typography variant="button">See Resume</Typography>
                </Box>
              </Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
      {show ? (
        <Modale
          show={show}
          setShow={setShow}
          token={token}
          id={id}
          type={type}
          handleClose={handleClose}
          company={company_name}
          designation={designation}
          compensation={compensation}
          additionalInfo={additional_info}
          profileInfo={profileInfo}
          setError={setError}
          setShowError={setShowError}
          setSuccess={setSuccess}
          setShowSuccess={setShowSuccess}
          setShowLoader={setShowLoader}
          getDashboardInfo={getDashboardInfo}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default JobCard;
