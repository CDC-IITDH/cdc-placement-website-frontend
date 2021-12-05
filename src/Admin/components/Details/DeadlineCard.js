import { Box, Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";

const date = "31-12-2021";

const DeadlineCard = () => {
  const classes = useStyles();
  const [status, setStatus] = useState(1);
  const form_status = {
    0: "OFF",
    1: "ON",
  };

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
          {date}
        </Box>
        <Box
          sx={{
            color: "#46505A",
            fontSize: "0.7rem",
            marginBlock: "0.5rem",
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
          }}
        >
          DD-MM-YYYY
        </Box>
      </Box>
      <Box
        sx={{
          marginBlock: "1rem",
        }}
      >
        <Button className={classes.buttons} variant='outlined' color='primary'>
          {`Turn ${form_status[status ^ 1]}`}
        </Button>
      </Box>
    </Box>
  );
};

export default DeadlineCard;
