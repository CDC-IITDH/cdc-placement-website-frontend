import { useState } from "react";
import useStyles from "./styles";
import { Box, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import EditStudent from "./editStudent";

const StudentCard = ({ name, branch, batch, student_id, resume_list, additional_info, token, reqJobPosting, application_id }) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const hanldeModal = () => {
    setShow(true);
  };

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
      <EditStudent
                show={show}
                setShow={setShow}
                reqJobPosting={reqJobPosting}
                token={token}
                student_name = {name}
                student_batch = {batch}
                student_branch = {branch}
                student_id = {student_id}
                resume_file_names = {resume_list}
                application_id = {application_id}
                additional_info = {additional_info}
              />
      <Box
        sx={{
          marginBlock: "0.5rem",
          marginInline: "0.5rem",
        }}
      >
        <Typography className={classes.studentCardText}>
          Name : {name}
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
            backgroundColor: "#00C3BC",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "2rem",
            width: "2rem",
          }}
        >
          <EditIcon 
            onClick={hanldeModal}
          />
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
