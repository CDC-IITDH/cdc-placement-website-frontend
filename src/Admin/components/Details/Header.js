import React from "react";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import useStyles from "./styles";
import { Divider, Typography } from "@material-ui/core";

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainPageContainer}>
      <div className={classes.headerContainer}>
        <div className={classes.appliedStudents}>
          <div className={classes.appliedStudentsInner}>
            <PeopleAltIcon className={classes.peopleIcon} />
          </div>
          <div className={classes.appliedStudentsInner}>
            <Typography className={classes.appliedText}>
              Students Applied :{" "}
            </Typography>
            <Typography className={classes.appliedText}>
              Students Selected :{" "}
            </Typography>
          </div>
        </div>
        <div className={classes.otherFunctions}>
          <div className={classes.otherFunctionButtons}>
            <AddIcon className={classes.addIcon} />
            <Typography className={classes.buttonText}>Add Student</Typography>
          </div>
          <div className={classes.otherFunctionButtons}>
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
    </div>
  );
};

export default Header;
