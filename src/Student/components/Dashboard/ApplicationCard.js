import {Fragment} from "react";
import Card from "react-bootstrap/Card";
import {AccountBalanceWalletRounded, Ballot, Work} from "@material-ui/icons";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DashboardCardStyles from "./DashboardCardStyles.js";
import {SvgIcon, Divider, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import LabelIcon from "@material-ui/icons/Label";


function ApplicationCard({
                             type,
                             id,
                             company,
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
                    style={{textDecoration: "none", color: "black"}}
                >
                    <div className={css.applicationInfo}>
                        <Grid container className={css.applicationTitleGrid}>
                            <Grid item xs={12} sm={9} className={css.applicationTitleElements}>
                                <Typography variant="h5" component="h6" style={{marginLeft: "20px"}}>
                                    <SvgIcon component={Work}/> {company}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3} className={css.applicationTitleStatus}>
                                {selected === null ? (
                                    <Card className={css.selectionCardOngoing}>
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
                                            className={css.selectionStatusSubtitle}
                                            variant="body1"
                                        >
                                            {selected === true ? "ACCEPTED" : "REJECTED"}
                                        </Typography>
                                    </Card>
                                )}
                            </Grid>
                        </Grid>

                        <Divider className={css.divider} variant="middle"/>

                        <Grid
                            container
                            direction="column"
                            className={css.applicationGridContainer}
                        >

                            <Grid item>
                                <div className='application-card-fields'>
                                    <SvgIcon component={InsertDriveFileIcon}/>
                                    {" Resume: "}
                                    <a href={resume.link}>{resume.name.substring(16)}</a>
                                </div>
                            </Grid>
                            {Object.entries(JSON.parse(additional_info)).map(([key, val]) => (
                                <Grid item key={key}>
                                    <div className='application-card-fields' key={key}>
                                        <LabelIcon/> {capitalizeFirstLetter(key)}: {val}
                                    </div>
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
