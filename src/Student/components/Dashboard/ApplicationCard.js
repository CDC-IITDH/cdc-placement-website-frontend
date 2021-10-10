import { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { AccountBalanceWalletRounded, Ballot, Work } from "@material-ui/icons";
import DashboardCardStyles from "./DashboardCardStyles.js";
import { SvgIcon, Divider, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LabelIcon from "@material-ui/icons/Label";

function ApplicationCard({
  type,
  id,
  company,
  application_status,
  resume,
  additional_info,
  selected,
}) {
  const css = DashboardCardStyles();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Fragment>
      <Card className={css.applicationCard}>
        <Link
          to={`student/dashboard/${type}/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={css.applicationInfo}>
            <Grid container className={css.applicationTitleGrid}>
              <Grid item xs={6} sm={9} className={css.applicationTitleElements}>
                <Typography variant="h5" component="h6" style={{marginLeft:"20px"}}>
                  <SvgIcon component={Work} /> {company}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} className={css.applicationTitleStatus}>
                {selected === null ? (
                  <Card className={css.selectionCardApplication}>
                    <Typography
                      className={css.selectionStatusTitle}
                      variant="body1"
                    >
                      APPLIED
                    </Typography>
                    <Typography
                      className={css.selectionStatusSubtitle}
                      variant="body2"
                    >
                      In Progress...
                    </Typography>
                  </Card>
                ) : (
                  <Card
                    className={`${css.selectionCardApplication} ${
                      selected
                        ? css.selectionCardAccepted
                        : css.selectionCardRejected
                    }`}
                  >
                    <Typography
                      className={css.selectionStatusText}
                      variant="body1"
                    >
                      {selected === true ? "ACCEPTED" : "REJECTED"}
                    </Typography>
                  </Card>
                )}
              </Grid>
            </Grid>

            <Divider className={css.divider} variant="middle" />

            <Grid
              container
              direction="column"
              className={css.applicationGridContainer}
            >
              <Grid item>
                <h6>
                  <SvgIcon component={Ballot} /> Status: {application_status}
                </h6>
              </Grid>
              <Grid item>
                <h6>
                  <SvgIcon component={AccountBalanceWalletRounded} />
                  {" Resume: "}
                  {resume.substring(16)}
                </h6>
              </Grid>
              {Object.entries(additional_info).map(([key, val]) => (
                <Grid item key={key}>
                  <h6 key={key}>
                    <LabelIcon /> {capitalizeFirstLetter(key)}: {val}
                  </h6>
                </Grid>
              ))}
            </Grid>
          </div>
        </Link>
      </Card>
    </Fragment>
  );
}

export default ApplicationCard;
