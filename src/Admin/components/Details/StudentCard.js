import React from "react";
import useStyles from "./styles";
import { Box, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const StudentCard = ({ name, branch, batch, roll_no }) => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        bgcolor: "#E5E1E1",
        boxShadow: 1,
        borderRadius: 20,
        height: "150px",
        p: 1,
        margin: "0.25rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBlock: "0.5rem",
        paddingInline: "0.5rem",
      }}
    >
      <Box
        sx={{
          marginBlock: "0.5rem",
          marginInline: "0.5rem",
        }}
      >
        <Typography className={classes.studentCardText}>
          Name : {name}
        </Typography><Typography className={classes.studentCardText}>
          Roll No. : {roll_no}
        </Typography>
        <Typography className={classes.studentCardText}>
          Batch : {batch}
        </Typography>
        <Typography className={classes.studentCardText}>
          Branch : {branch}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingInline: "0.5rem",
          paddingBlock: "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            color: "white",
            backgroundColor: "#FF7C86",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "2rem",
            width: "2rem",
          }}
        >
          <ClearIcon />
        </Box>
        <Box
          sx={{
            borderRadius: "50%",
            color: "white",
            backgroundColor: "#66C971",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "2rem",
            width: "2rem",
          }}
        >
          <CheckIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentCard;
