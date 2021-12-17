import React from "react";
import useStyles from "./styles";
import { Box, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { MarkStatus } from "../../api/details_page";
import { GetApplications } from "../../api/details_page";

const StudentCard = ({
  name,
  branch,
  batch,
  openingId,
  roll_no,
  token,
  setapplicationsInfo,
  selected,
  setselectedStudents,
}) => {
  const classes = useStyles();

  const getApplicationsInfo = () => {
    if (token) {
      GetApplications(token, openingId)
        .then((res) => {
          const data = res;
          setapplicationsInfo(data);
          setselectedStudents(
            data?.applications?.filter((elem) => elem.selected === true).length
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const markStatus = async (status) => {
    const data = {
      opening_id: openingId,
      student_list: [
        {
          student_id: String(roll_no),
          student_selected: status,
        },
      ],
    };

    var result = await MarkStatus(token, data);

    if (result.message === "Marked Status") {
      getApplicationsInfo();
    } else {
      console.log("Unable to mark status");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#E5E1E1",
        boxShadow: 1,
        border: "5px solid",
        borderColor: selected
          ? "#32CD32"
          : selected === false
          ? "#FF8A8A"
          : "#E5E1E1",
        borderRadius: 20,
        height: "180px",
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
          Name : <b>{name}</b>
        </Typography>
        <Typography className={classes.studentCardText}>
          Roll No : <b>{roll_no}</b>
        </Typography>
        <Typography className={classes.studentCardText}>
          Batch : <b>{batch}</b>
        </Typography>
        <Typography className={classes.studentCardText}>
          Branch : <b>{branch}</b>
        </Typography>
        <br />
        <Typography className={classes.studentCardText}>
          Status :{" "}
          <b>
            {selected ? "Selected" : selected === false ? "Rejected" : "TBD"}
          </b>
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
          onClick={() => markStatus("false")}
          sx={{
            borderRadius: "50%",
            color: "white",
            backgroundColor: "#DC143C",
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
          onClick={() => markStatus("true")}
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
