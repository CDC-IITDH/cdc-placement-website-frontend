import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modale from "../ApplyJob/Modale.js";
import PopOver from "../AcceptJob/PopOver.js";
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
import { Col, Row } from "react-bootstrap";

function Cards({
  type,
  id,
  token,
  company,
  designation,
  compensation,
  deadline_datetime,
  additional_info,
  profileInfo,
  hasApplied, //if the student has applied for the job or not
  selectionStatus,
  hasChoosen, //if the student has accepted the offer or not
  offerStatus,
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
  const [offerChooseShow, setOfferChooseShow]= useState(false);
  const handleChooseClose = () => setOfferChooseShow(false);
  const handleChooseShow = () => setOfferChooseShow(true);
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

            <Row className={css.inner_info}>
              <Col sm={12} md={6} lg={4} className={css.designation}>
                <h6>
                  <Row>
                    <Col xs={1}>
                      <SvgIcon component={Ballot} />
                    </Col>
                    <Col xs={11} style={{ fontSize: "14px" }}>
                      <div style={{ fontWeight: "600" }}> Designation:</div>
                      {designation}
                    </Col>
                  </Row>
                </h6>
              </Col>

              <Col sm={12} md={6} lg={4} className={css.compensation}>
                <h6>
                  <Row>
                    <Col xs={1}>
                      <SvgIcon component={AccountBalanceWalletRounded} />
                    </Col>
                    <Col xs={11} style={{ fontSize: "14px" }}>
                      <div style={{ fontWeight: "600" }}>
                        {" "}
                        Compensation - CTC:
                      </div>
                      {compensation.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: "0",
                      })}
                    </Col>
                  </Row>
                </h6>
              </Col>

              <Col sm={12} md={6} lg={4} className={css.deadline_datetime}>
                <h6>
                  <Row>
                    <Col xs={1}>
                      <SvgIcon component={Today} />
                    </Col>
                    <Col xs={11} style={{ fontSize: "14px" }}>
                      <div style={{ fontWeight: "600" }}> Apply before:</div>
                      {new Date(deadline_datetime).toDateString() +
                        ", " +
                        new Date(deadline_datetime).toLocaleTimeString()}
                    </Col>
                  </Row>
                </h6>
              </Col>
            </Row>
          </div>
        </Link>

        {hasApplied ? (
          selectionStatus === null ? (
            <Card className={css.selectionCard}>
              <Typography className={css.selectionStatusTitle} variant="body1" >
                APPLIED
              </Typography>
              <Typography
                className={css.selectionStatusSubtitle}
                variant="body2"
              >
                In Progress...
              </Typography>
            </Card>
          ) : !selectionStatus ? (
            <Card className={css.selectionCardRejectedCard}>
              <Typography className={css.selectionStatusTitle} variant="body2" align="center">
                STATUS
              </Typography>
              {/* <Divider className={css.divider} variant="middle" /> */}
              <Typography className={css.selectionStatusText} variant="body1" align="center">
                {(selectionStatus = "REJECTED")}
              </Typography>
            </Card>
          ) : !hasChoosen ? (
            !offerStatus ? ( //if offer accepted
              <Card className={css.wholeCard}>
                <div className={css.wholeCardAccepted}>
                  <Typography
                    className={css.selectionStatusTitle}
                    variant="body2"
                    align="center"
                  >
                    STATUS
                  </Typography>
                  <Typography
                    className={css.selectionStatusText}
                    variant="body1"
                    align="center"
                  >
                    {(selectionStatus = "SELECTED")}
                  </Typography>
                </div>
                <div className={css.wholeCardAccepted}>
                  <Typography
                    className={css.selectionStatusTitle}
                    variant="body2"
                    align="center"
                  >
                    OFFER
                  </Typography>
                  <Typography
                    className={css.selectionStatusText}
                    variant="body1"
                    align="center"
                  >
                    {(selectionStatus = "ACCEPTED")}
                  </Typography>
                </div>
              </Card>
            ) : (
              //if  offer rejected
              <Card className={css.wholeCard}>
                <div className={css.wholeCardAccepted}>
                  <Typography
                    className={css.selectionStatusTitle}
                    variant="body2"
                    align="center"
                  >
                    STATUS
                  </Typography>
                  <Typography
                    className={css.selectionStatusText}
                    variant="body1"
                    align="center"
                  >
                    {(selectionStatus = "SELECTED")}
                  </Typography>
                </div>
                <div className={css.wholeCardRccepted}>
                  <Typography
                    className={css.selectionStatusTitle}
                    variant="body2"
                    align="center"
                  >
                    OFFER
                  </Typography>
                  <Typography
                    className={css.selectionStatusText}
                    variant="body1"
                    align="center"
                  >
                    {(selectionStatus = "DENIED")}
                  </Typography>
                </div>
              </Card>
            )
          ) : (
            // we have to ask for the student's opinion
            <Card className={css.wholeCard}>
              <div className={css.wholeCardAccepted}>
                <Typography
                  className={css.selectionStatusTitle}
                  variant="body2"
                  align="center"
                >
                  STATUS
                </Typography>
                <Typography className={css.selectionStatusText} variant="body1" align="center">
                  {(selectionStatus = "SELECTED")}
                </Typography>
              </div>
              <button
                align="center"
                className={css.wholeCardchoose}
                onClick={handleChooseShow}
              >
                <Typography
                  className={css.selectionStatusTitle}
                  variant="body2"
                  align="center"
                >
                  OFFER
                </Typography>
                <Typography className={css.selectionStatusText} variant="body1" align="center">
                  {(selectionStatus = "ACCEPT  ?")}
                </Typography>
              </button>
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

      {offerChooseShow ? (
        <PopOver
          show={offerChooseShow}
          setShow={setOfferChooseShow}
          token={token}
          type={type}
          id={id}
          offerStatus={offerStatus}
          hasChoosen={hasChoosen}
          handleClose={handleChooseClose}
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
