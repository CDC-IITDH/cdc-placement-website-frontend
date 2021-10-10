import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modale from "../ApplyJob/Modale.js";
import {
  AccountBalanceWalletRounded,
  Ballot,
  Work,
  Today,
} from "@material-ui/icons";
import "./Dashboard.css";
import DashboardCardStyles from "./DashboardCardStyles.js";
import { SvgIcon, Divider, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Cards({
  type,
  id,
  token,
  company,
  designation,
  compensation,
  start_date,
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
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const css = DashboardCardStyles();

  return (
    <>
      <Card className={css.dashboardCard}>
        <Link
          to={`student/dashboard/${type}/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={css.basicInfo}>
            <div className={css.companyName}>
              <h6>
                <SvgIcon component={Work} /> {company}
              </h6>
            </div>

            <Divider className={css.divider} variant="middle" />

            <div className={css.inner_info}>
              <div className={css.designation}>
                <h6>
                  <SvgIcon component={Ballot} /> {designation}
                </h6>
              </div>

              <div className={css.compensation}>
                <h6>
                  <SvgIcon component={AccountBalanceWalletRounded} />{" "}
                  {compensation}
                </h6>
              </div>

              <div className={css.start_date}>
                <h6>
                  <SvgIcon component={Today} /> {start_date}
                </h6>
              </div>
            </div>
          </div>
        </Link>

        {hasApplied ? (
          selectionStatus === null ? (
            <Card className={css.selectionCard}>
              <Typography className={css.selectionStatusTitle} variant="body1">
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
              className={`${css.selectionCard} ${
                selectionStatus
                  ? css.selectionCardAccepted
                  : css.selectionCardRejected
              }`}
            >
              <Typography className={css.selectionStatusText} variant="body1">
                {selectionStatus === true ? "ACCEPTED" : "REJECTED"}
              </Typography>
            </Card>
          )
        ) : (
          <button
            align="center"
            className={css.apply_job_button}
            onClick={handleShow}
          >
            Apply now
          </button>
        )}
      </Card>

      {show ? (
        <Modale
          show={show}
          setShow={setShow}
          token={token}
          type={type}
          id={id}
          handleClose={handleClose}
          company={company}
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
    </>
  );
}

export default Cards;
