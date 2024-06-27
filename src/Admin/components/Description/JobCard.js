import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import LinkIcon from "@material-ui/icons/Link";


const JobCard = ({
                     id,
                     token,
                     type,
                     designation,
                     company_name,
                     company_type,
                     company_address,
                     bond_details,
                     company_details,
                     company_details_pdf_links,
                     is_company_details_pdf,
                     compensation_CTC,
                     compensation_bonus,
                     compensation_gross,
                     compensation_take_home,
                     compensation_pdf_links,
                     is_compensation_details_pdf,
                     compensation_details,
                     description,
                     description_pdf_links,
                     is_description_pdf,
                     tier,
                     start_date,
                     allowed_branch,
                     allowed_batch,
                     website,
                     selection_procedure,
                     selection_procedure_details,
                     selection_procedure_details_pdf_links,
                     is_selection_procedure_details_pdf,
                     pin_code,
                     nature_of_business,
                     other_requirements,
                     tentative_no_of_offers,
                     attachments,
                     additional_info,
                     city,
                     city_type,
                     country,
                     created_at,
                     co_op,
                     duration,
                     contact_person_name,
                     contact_person_email,
                     contact_person_phone,
                     setError,
                     setShowError,
                     setSuccess,
                     setShowSuccess,
                     setShowLoader,
                     getDashboardInfo
                 }) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Grid direction="row-reverse" container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box className={classes.headingBox}>
                        <Box>
                            <Typography variant="h2" style={{fontSize:"3.1rem"}}>{company_name}</Typography>
                            <Box style={{marginTop: "10px"}}>
                                <Typography
                                    display="inline"
                                    style={{marginTop: "10px"}}
                                    variant="h5"
                                >
                                    {designation}
                                </Typography>
                                <Typography
                                    display="inline"
                                    style={{marginTop: "10px"}}
                                    variant="h5"
                                    color="textPrimary"
                                >
                                    {type === "internships" && co_op ? " (Co-Op)" : ""}
                                </Typography>
                            </Box>
                            <Typography style={{marginTop: "10px"}} variant="h6">
                                {company_address}
                            </Typography>
                            {(website && website.length > 0) ? (
                                <a href={website}>
                                    <LinkIcon/>
                                </a>
                            ) : ""}
                        </Box>

                    </Box>
                    <Box className={classes.boxDivider}>
                        <Divider component="h1"/>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                    { tier && 
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card variant="outlined">
                            <CardContent style={{padding:"10px 16px"}}>
                                <Typography color="textSecondary" gutterBottom>
                                    Tier
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    {tier}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    }
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card variant="outlined" >
                            <CardContent style={{padding:"10px 16px"}}>
                                <Typography color="textSecondary" gutterBottom>
                                    Start Date
                                </Typography>
                                {type === "Internship" && duration ? (
                                    <Typography variant="h5" component="h5">
                                        {`${start_date} | ${duration} months`}
                                    </Typography>
                                ) : (
                                    <Typography variant="h5" component="h5">
                                        {new Date(start_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card variant="outlined" >
                            <CardContent style={{padding:"10px 16px"}}>
                                {type === "Internship" ? (
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
                                    {compensation_CTC ? ` ${compensation_CTC.toLocaleString()}` : ""}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card variant="outlined" >
                            <CardContent style={{padding:"10px 16px"}}>
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
                        <Card variant="outlined" >
                            <CardContent style={{padding:"10px 16px"}}>
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
                        <Card variant="outlined" >
                            <CardContent style={{padding:"10px 16px"}}>
                                <Typography color="textSecondary" gutterBottom>
                                    Allowed Batch
                                </Typography>
                                <Box className={classes.cardContainer}>
                                    {allowed_batch.map((elem, index) => {
                                        return (
                                            <Card key={index} className={classes.batchCard} >
                                                <Typography>{elem}</Typography>
                                            </Card>
                                        );
                                    })}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>


                <Grid item xs={12} md={8} lg={8}>
                    <Box>
                        {
                            company_details || is_company_details_pdf ? <div>

                                <Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                    Company Details
                                </Typography>
                                {company_details ? (<Typography variant="body1" component="p">

                                    {company_details}
                                </Typography>) : ""}
                                {
                                    company_type? <Typography variant="body1" component="body1">
                                      <b>  Company Type: </b> {company_type.toString()} <br/>
                                    </Typography> : ""
                                }
                                {is_company_details_pdf && company_details_pdf_links.length ?
                                    <Typography variant="body1" component="body1">
                                      <b>  Attachments:</b>
                                    </Typography> : ""
                                }
                                {is_company_details_pdf ?
                                    company_details_pdf_links?.map((elem, index) => {
                                        return (
                                            <Typography key={index} variant="body2" component="p">
                                                <a href={elem.link}>
                                                    {elem.name.substring(16)}
                                                </a>
                                                <br/>
                                            </Typography>
                                        );
                                    }) : ""}

                                <hr/>
                            </div> : ""

                        }


                        {
                            description || is_description_pdf ?
                                <div>
                                    <Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                        Job Description
                                    </Typography>
                                    {description ? (<Typography variant="body1" component="p">

                                        {description}
                                    </Typography>) : ""}
                                    {is_description_pdf && description_pdf_links.length ?
                                        <Typography variant="body1" component="body1">
                                            <b> Attachments:</b>
                                        </Typography> : ""
                                    }
                                    {is_description_pdf ?
                                        description_pdf_links?.map((elem, index) => {
                                            return (
                                                <Typography key={index} variant="body2" component="p">
                                                    <a href={elem.link}>
                                                        {elem.name.substring(16)}
                                                    </a>
                                                    <br/>
                                                </Typography>
                                            );
                                        }) : ""}

                                    <hr/>
                                </div> : ""

                        }
                        {
                            compensation_CTC || compensation_gross || compensation_details || is_compensation_details_pdf ?
                                <div>
                                    <Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                        Compensation Details
                                    </Typography>
                                    {compensation_CTC ? (<Typography variant="body1" component="p">

                                        <b>Cost To Company (CTC): </b> Rs. {compensation_CTC}
                                    </Typography>) : ""}

                                    {compensation_gross ? (<Typography variant="body1" component="p">

                                        <b>Gross Compensation: </b> Rs. {compensation_gross}
                                    </Typography>) : ""}
                                    {compensation_bonus ? (<Typography variant="body1" component="p">

                                        <b>Bonus: </b> Rs. {compensation_bonus}
                                    </Typography>) : ""}
                                    {compensation_take_home ? (<Typography variant="body1" component="p">

                                        <b>Take Home Compensation: </b> Rs. {compensation_take_home}
                                    </Typography>) : ""}
                                      {
                                        compensation_details? <Typography variant="body1" component="p">
                                            {compensation_details}
                                                </Typography>:""
                                    }
                                    {is_compensation_details_pdf && compensation_pdf_links.length ?
                                        <Typography variant="body1" component="body1">
                                            <b>Attachments:</b>
                                        </Typography> : ""
                                    }
                                    {is_compensation_details_pdf ?
                                        compensation_pdf_links?.map((elem, index) => {
                                            return (
                                                <Typography key={index} variant="body2" component="p">
                                                    <a href={elem.link}>
                                                        {elem.name.substring(16)}
                                                    </a>
                                                    <br/>
                                                </Typography>
                                            );
                                        }) : ""}

                                    <hr/>
                                </div> : ""

                        }
                        {
                            selection_procedure || selection_procedure_details || is_selection_procedure_details_pdf ?
                                <div>
                                    <Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                        Tentative Selection Procedure
                                    </Typography>
                                    {selection_procedure ? (<Typography variant="body1" component="p">
                                        <ol>
                                        {selection_procedure?.map((elem, index) => {
                                            return (
                                                <li>
                                                <Typography key={index} variant="body1" component="p">
                                                    {elem}
                                                </Typography>
                                                    </li>
                                            );
                                        })}
</ol>
                                    </Typography>) : ""}

                                    {is_selection_procedure_details_pdf && selection_procedure_details_pdf_links.length ?
                                        <Typography variant="body1" component="body1">
                                            <b> Attachments:</b>
                                        </Typography> : ""
                                    }
                                    {is_selection_procedure_details_pdf ?
                                        selection_procedure_details_pdf_links?.map((elem, index) => {
                                            return (
                                                <Typography key={index} variant="body2" component="p">
                                                    <a href={elem.link}>
                                                        {elem.name.substring(16)}
                                                    </a>
                                                    <br/>
                                                </Typography>
                                            );
                                        }) : ""}

                                    <hr/>
                                </div> : ""

                        }
                        {
                            other_requirements ? <div><Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                        Other Requirements
                                    </Typography>
                            <Typography variant="body1" component="body1">
                                {other_requirements}
                                        </Typography>

                            </div>:""



                        }
                        {
                            bond_details? <div><Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                       Bond Details
                                    </Typography>
                            <Typography variant="body1" component="body1">
                                {bond_details}
                                        </Typography>

                            </div>:""
                        }
                        {
                             tentative_no_of_offers? <div><Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                      Tentative No. of Offers
                                    </Typography>
                            <Typography variant="body1" component="body1">
                                {tentative_no_of_offers}
                                        </Typography>

                            </div>:""
                        }
                        {other_requirements || other_requirements || tentative_no_of_offers ?<hr/>:"" }
                        {
                            contact_person_name || contact_person_email || contact_person_phone ?
                                <div>
                                    <Typography variant="h5" component="h5" style={{margin: "10px 0 5px"}}>
                                        Contact Person Information
                                    </Typography>
                                    {contact_person_name ? (<Typography variant="body1" component="p">
                                        <b>Name: </b> {contact_person_name}
                                    </Typography>) : ""}
                                    {contact_person_email ? (<Typography variant="body1" component="p">
                                        <b>Email: </b> {contact_person_email}
                                    </Typography>) : ""}
                                    {contact_person_phone ? (<Typography variant="body1" component="p">
                                        <b>Phone: </b> {contact_person_phone}
                                    </Typography>) : ""}
                                </div>:""
                        }

                    </Box>
                </Grid>

            </Grid>

        </Box>
    );
};

export default JobCard;
