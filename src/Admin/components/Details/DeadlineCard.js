import {Box, Button, Divider} from "@material-ui/core";
import React, {useState} from "react";
import useStyles from "./styles";
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {UpdateDeadline} from "../../api/details_page";
import swal from "sweetalert";

const DeadlineCard = (
    {
        opening_offer_accepted,
        deadline_datetime,
        setShowLoader,
        getDashboardInfo,
        token,
        opening_id
    }
) => {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(
        new Date(deadline_datetime)
    );
    const [status, setStatus] = useState(selectedDate - new Date() ? 1 : 0);


    const form_status = {
        0: "OFF",
        1: "ON",
    };

    const updateDeadlineFun = () => {
        // selectedDate in '%Y-%m-%d %H:%M:%S %z'
        const deadline_datetime = selectedDate.toISOString().slice(0, 19).replace('T', ' ') + " +0000";
        // var deadline_datetime = String.toString(selectedDate).replace('T', ' ');
        UpdateDeadline(token, deadline_datetime, opening_id).then((res) => {

            getDashboardInfo();
            setShowLoader(false);
            swal("Success!", "Deadline updated successfully", "success");

        }).catch((err) => {
            console.log(err);
            setShowLoader(false);
            swal("Error!", "Deadline update failed", "error");
        });
    };


    if (opening_offer_accepted === true) {
        return (
            <Box
                sx={{
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    borderRadius: 10,
                    p: 1,
                    width: "200px",
                    textAlign: "center",
                    margin: "0.25rem",
                }}
            >
                <Box>
                    <Box
                        sx={{
                            color: "#46505A",
                            fontSize: "1rem",
                            marginTop: "0.5rem",
                            marginBottom: "1rem",
                            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                        }}
                    >
                        Form Status : {form_status[status]}
                    </Box>
                    <Box
                        sx={{
                            marginBottom: "1rem",
                        }}
                    >
                        <Divider/>
                    </Box>
                    <Box
                        sx={{
                            color: "#46505A",
                            fontSize: "0.85rem",
                            marginBlock: "0.5rem",
                            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                        }}
                    >
                        Current Deadline
                    </Box>
                    <Box
                        sx={{
                            fontSize: "1.25rem",
                            fontWeight: "normal",
                            marginBlock: "0.25rem",
                            color: "#2F4050",
                        }}
                    >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                value={selectedDate}
                                ampm={false}
                                onChange={handleDateChange}
                                onError={console.log}
                                format='dd/MM/yy, hh:mm a'
                                disablePast
                                InputProps={{
                                    style: {fontSize: 13, marginLeft: "0.5rem"},
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                    <Box
                        sx={{
                            color: "#46505A",
                            fontSize: "0.7rem",
                            marginBlock: "0.5rem",
                            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                        }}
                    >
                        DD-MM-YY HH-MM
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginBlock: "1rem",
                    }}
                >

                    <Button className={classes.buttons} variant='outlined' color='primary' size={'small'}
                            onClick={updateDeadlineFun}>
                        Set Deadline
                    </Button>
                </Box>
            </Box>
        );
    } else {
        return <Box></Box>

    }

}

export default DeadlineCard;
