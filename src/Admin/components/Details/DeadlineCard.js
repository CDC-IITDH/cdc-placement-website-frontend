import { Box, Button, Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { UpdateDeadline } from "../../api/details_page";
import { GetDashboard } from "../../api/dashboard";

const DeadlineCard = ({
  reqJobPosting,
  openingId,
  token,
  setdashboardInfo,
}) => {
  const classes = useStyles();
  const [status, setStatus] = useState(1);
  const [selectedDate, handleDateChange] = useState(null);
  const [disabled, setdisabled] = useState(true);

  const getDashboardInfo = () => {
    if (token) {
      GetDashboard(token)
        .then((res) => {
          const data = res;
          setdashboardInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setDate = (date) => {
    handleDateChange(date.toISOString());
    setdisabled(false);
  };

  useEffect(() => {
    if (reqJobPosting) {
      handleDateChange(reqJobPosting?.deadline_datetime);
      if (reqJobPosting?.deadline_datetime < new Date().toISOString()) {
        setStatus(0);
      }
    }
  }, [reqJobPosting]);

  const handleDeadlineUpdate = async () => {
    if (selectedDate < new Date().toISOString()) {
      alert("Date has already passed. Cant select passed date");
      handleDateChange(reqJobPosting?.deadline_datetime);
    } else {
      const date = selectedDate;
      const newDate = date.substr(0, 10) + " " + date.substr(11, 8) + " +0530";

      const data = {
        opening_id: openingId,
        deadline_datetime: newDate,
      };

      var result = await UpdateDeadline(token, data);
      console.log(result);
      if (result.message === "Deadline Updated") {
        console.log("Deadline succcessfully changed");
        getDashboardInfo();
      } else {
        console.log("Something did not go right. Could not change deadline");
      }
    }
    setdisabled(true);
  };

  const form_status = ["OFF", "ON"];

  console.log(selectedDate);

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
          <Divider />
        </Box>
        <Box
          sx={{
            color: "#46505A",
            fontSize: "0.85rem",
            marginBlock: "0.5rem",
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
          }}
        >
          {status ? "Current Deadline" : "Past Deadline!"}
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
              onChange={setDate}
              onError={console.log}
              format='dd/MM/yy, hh:mm a'
              InputProps={{
                style: { fontSize: 13, marginLeft: "0.5rem" },
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
        {disabled ? (
          <Button
            onClick={handleDeadlineUpdate}
            className={classes.buttons}
            variant='outlined'
            color='primary'
            disabled
          >
            {status ? `Change Date` : `Turn ${form_status[status ^ 1]} Again`}
          </Button>
        ) : (
          <Button
            onClick={handleDeadlineUpdate}
            className={classes.buttons}
            variant='outlined'
            color='primary'
          >
            {status ? `Change Date` : `Turn ${form_status[status ^ 1]} Again`}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DeadlineCard;
