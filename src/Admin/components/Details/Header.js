import React, { useState } from "react";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import useStyles from "./styles";
import { Divider, Typography } from "@material-ui/core";
import { ExportAsExcel } from "../../api/details_page";
import AddStudent from "./AddStudent";

const Header = ({
  studentsApplied,
  openingId,
  token,
  reqJobPosting,
  selectedStudents,
  setShowLoader,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  setapplicationsInfo,
  setselectedStudents,
}) => {
  const classes = useStyles();
  const [showAddStudentModal, setshowAddStudentModal] = useState(false);

  const exportAsExcel = () => {
    if (token) {
      ExportAsExcel(token, openingId)
        .then((res) => {
          const data = res;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Token not present");
    }
  };

  const handleAddStudentModal = () => {
    setshowAddStudentModal(true);
  };

  return (
    <div className={classes.mainPageContainer}>
      <div className={classes.headerContainer}>
        <div className={classes.appliedStudents}>
          <div className={classes.appliedStudentsInner}>
            <PeopleAltIcon className={classes.peopleIcon} />
          </div>
          <div className={classes.appliedStudentsInner}>
            <Typography className={classes.appliedText}>
              Students Applied :{` ${studentsApplied}`}
            </Typography>
            <Typography className={classes.appliedText}>
              Students Selected :{` ${selectedStudents}`}
            </Typography>
          </div>
        </div>
        <div className={classes.otherFunctions}>
          <div
            onClick={handleAddStudentModal}
            className={classes.otherFunctionButtons}
          >
            <AddIcon className={classes.addIcon} />
            <Typography className={classes.buttonText}>Add Student</Typography>
          </div>
          <div onClick={exportAsExcel} className={classes.otherFunctionButtons}>
            <LocalPrintshopIcon className={classes.printIcon} />
            <Typography className={classes.buttonText}>
              Export as Excel
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.dividerContainer}>
        <Divider className={classes.divider} orientation='vertical' flexItem />
      </div>
      <AddStudent
        reqJobPosting={reqJobPosting}
        show={showAddStudentModal}
        setShow={setshowAddStudentModal}
        token={token}
        openingId={openingId}
        setShowLoader={setShowLoader}
        setError={setError}
        setShowError={setShowError}
        setSuccess={setSuccess}
        setShowSuccess={setShowSuccess}
        setapplicationsInfo={setapplicationsInfo}
        setselectedStudents={setselectedStudents}
      />
    </div>
  );
};

export default Header;
