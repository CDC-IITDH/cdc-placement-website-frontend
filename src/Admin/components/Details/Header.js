import React, { useState, useEffect } from "react";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import SearchIcon from "@material-ui/icons/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Typography,
  Divider,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputAdornment,
  Menu,
  MenuItem,
  Icon,
  IconButton,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";
import { ExportAsExcel } from "../../api/details_page";
import AddStudent from "./AddStudent";
import { set } from "date-fns";

const Header = ({
  studentsApplied,
  countStudentsSelected,
  openingId,
  token,
  reqJobPosting,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  getApplicationsInfo,
}) => {
  const classes = useStyles();
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [show, setShow] = useState(["filterOptionsBatch", "batch"]);

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener("click", closeDropdown);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [dropdownOpen]);

  const exportAsExcel = () => {
    if (token) {
      ExportAsExcel(token, openingId)
        .then((res) => {
          const data = res.data;
          if (data.file) {
            window.open(data.file);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAddStudentModal = () => {
    setShowAddStudentModal(true);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownAnchorEl(event.currentTarget);
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const openBatch = (event) => {
    event.stopPropagation();
    setShow(["filterOptionsBatch", "batch"]);
  };

  const openBranch = (event) => {
    event.stopPropagation();
    setShow(["filterOptionsBranch", "branch"]);
  };

  const openStatus = (event) => {
    event.stopPropagation();
    setShow(["filterOptionsStatus", "status"]);
  };

  const handleCheckboxChange = (id, optionType) => {
    if (optionType === "batch") {
      const updatedOptions = filterOptionsBatch.map((option) => {
        if (option.id === id) {
          return { ...option, selected: !option.selected };
        }
        return option;
      });
      setFilterOptionsBatch(updatedOptions);
    } else if (optionType === "branch") {
      const updatedOptions = filterOptionsBranch.map((option) => {
        if (option.id === id) {
          return { ...option, selected: !option.selected };
        }
        return option;
      });
      setFilterOptionsBranch(updatedOptions);
    } else if (optionType === "status") {
      const updatedOptions = filterOptionsStatus.map((option) => {
        if (option.id === id) {
          return { ...option, selected: !option.selected };
        }
        return option;
      });
      setFilterOptionsStatus(updatedOptions);
    }
  };

  const [filterOptionsBatch, setFilterOptionsBatch] = useState([
    { id: 1, name: "2020", selected: true },
    { id: 2, name: "2021", selected: true },
    { id: 3, name: "2022", selected: true },
    { id: 4, name: "2023", selected: true },
  ]);

  const [filterOptionsBranch, setFilterOptionsBranch] = useState([
    { id: 1, name: "CSE", selected: true },
    { id: 2, name: "EE", selected: true },
    { id: 3, name: "ME", selected: true },
  ]);

  const [filterOptionsStatus, setFilterOptionsStatus] = useState([
    { id: 1, name: "Applied", selected: true },
    { id: 2, name: "Selected", selected: true },
    { id: 3, name: "Rejected", selected: true },
  ]);

  return (
    <div className={classes.mainPageContainer}>
      <div className={classes.headerContainer}>
        <div className={classes.appliedStudents}>
          <div className={classes.appliedStudentsInner}>
            <PeopleAltIcon className={classes.peopleIcon} />
          </div>
          <div className={classes.appliedStudentsInner}>
            <Typography className={classes.appliedText}>
              Students Applied: {studentsApplied}
            </Typography>
            <Typography className={classes.appliedText}>
              Students Selected: {countStudentsSelected}
            </Typography>
          </div>
        </div>
        <div>
          <TextField
            className={classes.searchBar}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearchTextChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            className={classes.filterButton}
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleDropdownToggle}
            sx={{ p: 0.5, border: "1px solid", borderColor: "#E5E5E5" }}
          >
            <FilterAltIcon />
          </IconButton>
          {dropdownOpen && (
            <>
              <Menu
                id="long-menu"
                anchorEl={dropdownAnchorEl}
                open={dropdownOpen}
                onClose={handleDropdownClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
                MenuListProps={{
                  disablePadding: true,
                }}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={openBatch} disableRipple>
                  Batch
                </MenuItem>
                <MenuItem onClick={openBranch} disableRipple>
                  Branch
                </MenuItem>
                <MenuItem onClick={openStatus} disableRipple>
                  Status
                </MenuItem>
                <div className={classes.filterOptionsContainer}>
                  {show[0] === "filterOptionsBatch" &&
                    filterOptionsBatch.map((option) => (
                      <MenuItem
                        key={option.id}
                        disableRipple
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCheckboxChange(option.id, show[1]);
                        }}
                      >
                        <Checkbox
                          checked={option.selected}
                          color="primary"
                          onChange={(event) => {
                            event.stopPropagation();
                            handleCheckboxChange(option.id, show[1]);
                          }}
                        />
                        <Typography>{option.name}</Typography>
                      </MenuItem>
                    ))}
                  {show[0] === "filterOptionsBranch" &&
                    filterOptionsBranch.map((option) => (
                      <MenuItem
                        key={option.id}
                        disableRipple
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCheckboxChange(option.id, show[1]);
                        }}
                      >
                        <Checkbox
                          checked={option.selected}
                          color="primary"
                          onChange={(event) => {
                            event.stopPropagation();
                            handleCheckboxChange(option.id, show[1]);
                          }}
                        />
                        <Typography>{option.name}</Typography>
                      </MenuItem>
                    ))}
                  {show[0] === "filterOptionsStatus" &&
                    filterOptionsStatus.map((option) => (
                      <MenuItem
                        key={option.id}
                        disableRipple
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCheckboxChange(option.id, show[1]);
                        }}
                      >
                        <Checkbox
                          checked={option.selected}
                          color="primary"
                          onChange={(event) => {
                            event.stopPropagation();
                            handleCheckboxChange(option.id, show[1]);
                          }}
                        />
                        <Typography>{option.name}</Typography>
                      </MenuItem>
                    ))}
                </div>
              </Menu>
            </>
          )}
        </div>
        <div className={classes.otherFunctions}>
          <div
            onClick={handleAddStudentModal}
            className={classes.otherFunctionButtons}
          >
            <AddIcon className={classes.addIcon} />
            <Typography className={classes.buttonText}>
              Add/Edit <br />
              Application
            </Typography>
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
        <Divider className={classes.divider} orientation="vertical" flexItem />
      </div>
      <AddStudent
        reqJobPosting={reqJobPosting}
        show={showAddStudentModal}
        setShow={setShowAddStudentModal}
        token={token}
        setError={setError}
        setShowError={setShowError}
        setSuccess={setSuccess}
        setShowSuccess={setShowSuccess}
        getApplicationsInfo={getApplicationsInfo}
      />
    </div>
  );
};

export default Header;
