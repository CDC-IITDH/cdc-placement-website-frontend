import { useState } from "react";
import Card from "react-bootstrap/Card";
import {
  AccountBalanceWalletRounded,
  Ballot,
  Work,
  Today,
  Reorder,
} from "@material-ui/icons";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
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
  deadline_datetime,
  tier,
  contact_person_name,
  phone_number,
  email,
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
          to={`admin/details/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={css.basicInfo}>
            <div className={css.upper_info}>
              <div className={css.companyName}>
                <h6>
                  <SvgIcon component={Work} /> {company} (Tier-{tier})
                </h6>
              </div>
              <div className={css.contact}>
                <h6>
                  <div className={css.contact_name}>
                    <SvgIcon component={PermContactCalendarIcon} />
                    {contact_person_name}
                  </div>
                </h6>
              </div>
            </div>

            <Divider className={css.divider} variant='middle' />

            <div className={css.inner_info}>
              <div className={css.designation}>
                <h6>
                  <SvgIcon component={Ballot} /> {designation}
                </h6>
              </div>

              <div className={css.compensation}>
                <h6>
                  <SvgIcon component={AccountBalanceWalletRounded} /> CTC -
                  {" INR "}
                  {compensation}
                </h6>
              </div>

              <div className={css.start_date}>
                <h6>
                  <SvgIcon component={Today} /> {deadline_datetime.slice(0, 10)}
                </h6>
              </div>
              <div className={css.phone_number}>
                <h6>
                  <SvgIcon component={PhoneIcon} /> {phone_number}
                </h6>
              </div>
              <div className={css.email}>
                <h6>
                  <SvgIcon component={MailIcon} /> {email}
                </h6>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </>
  );
}

export default Cards;
