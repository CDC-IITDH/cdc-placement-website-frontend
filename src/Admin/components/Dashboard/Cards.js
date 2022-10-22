
import Card from "react-bootstrap/Card";
import {
    AccountBalanceWalletRounded,
    Ballot,
    Work,
    Today

} from "@material-ui/icons";
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

import MailIcon from '@material-ui/icons/Mail';
import "./Dashboard.css";
import DashboardCardStyles from "./DashboardCardStyles.js";
import {SvgIcon, Divider

} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

function Cards({
                   type,
                   id,
                   token,
                   company_name,
                   designation,
                   compensation_CTC,
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

    const css = DashboardCardStyles();

    return (
        <>
            <Card className={css.dashboardCard}>
                <Link
                    to={`admin/details/${type}/${id}`}
                    style={{textDecoration: "none", color: "black"}}
                >
                    <div className={css.basicInfo}>
                        <Row>
                            <Col sm={12} md={6} lg={4} className={css.companyName}>
                                <h6>

                                    <Row>
                                        <Col xs={1}>
                                            <SvgIcon component={Work}/>
                                        </Col>
                                        <Col xs={11}>

                                            {company_name}
                                        </Col>
                                    </Row>
                                </h6>
                            </Col>
                            <Col sm={12} md={6} lg={4} className={css.contact}>
                                <h6>
                                    <Row>
                                        <Col xs={12} style={{fontSize: "18px"}}>
                                            <div style={{fontWeight: "600"}}> Tier: {tier}</div>

                                        </Col>
                                    </Row>
                                </h6>
                            </Col>

                            <Col sm={12} md={6} lg={4} className={css.contact}>
                                <h6>
                                    <Row>
                                        <Col xs={1}>
                                            <SvgIcon component={PermContactCalendarIcon}/>
                                        </Col>
                                        <Col xs={11} style={{fontSize: "14px"}}>
                                            <div style={{fontWeight: "600"}}> Contact Person Name:</div>
                                            {contact_person_name ? contact_person_name : "N/A"}
                                        </Col>
                                    </Row>
                                </h6>
                            </Col>
                        </Row>


                        <Divider className={css.divider} variant="middle"/>

                        <Row>
                            <Col sm={12} md={6} lg={3} className={css.designation}>
                                <h6>
                                    <Row>
                                        <Col xs={1}>
                                            <SvgIcon component={Ballot}/>
                                        </Col>
                                        <Col xs={11} style={{fontSize: "14px"}}>
                                            <div style={{fontWeight: "600"}}> Designation:</div>
                                            {designation}
                                        </Col>
                                    </Row>
                                </h6>
                            </Col>

                            <Col sm={12} md={6} lg={3} className={css.compensation}>
                                <h6>
                                    <Row>
                                        <Col xs={1}>
                                            <SvgIcon component={AccountBalanceWalletRounded}/>
                                        </Col>
                                        <Col xs={11} style={{fontSize: "14px"}}>
                                            <div style={{fontWeight: "600"}}> Compensation - CTC:</div>
                                            {compensation_CTC.toLocaleString('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                maximumFractionDigits: "0"
                                            })}
                                        </Col>
                                    </Row>
                                </h6>
                            </Col>

                            <Col sm={12} md={6} lg={3} className={css.dead_line}>
                                <h6>
                                    <Row>
                                        <Col xs={1}>
                                            <SvgIcon component={Today}/>
                                        </Col>
                                        <Col xs={11} style={{fontSize: "14px"}}>

                                            <div style={{fontWeight: "600"}}> Apply before:</div>

                                            {deadline_datetime ? new Date(deadline_datetime).toDateString() + ", " + new Date(deadline_datetime).toLocaleTimeString() : "N/A"}
                                        </Col>
                                    </Row>
                                </h6>

                            </Col>
                            
                            <Col sm={12} md={6} lg={3} className={css.email}>
                                <h6>
                                    <Row>
                                        <Col xs={1}>
                                            <SvgIcon component={MailIcon}/>
                                        </Col>
                                        <Col xs={11} style={{fontSize: "14px"}}>
                                            <div style={{fontWeight: "600"}}> Email:</div>
                                            {email ? email : "Not Available"}
                                        </Col>
                                    </Row>
                                </h6>
                            </Col>
                        </Row>
                    </div>
                </Link>
            </Card>
        </>
    );
}

export default Cards;
