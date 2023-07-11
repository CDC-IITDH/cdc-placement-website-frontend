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
  Checkbox,
  InputAdornment,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";
import { ExportAsExcel } from "../../api/details_page";
import AddStudent from "./AddStudent";


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
  searchText,
  setSearchText,
  filterOptionsBatch,
  setFilterOptionsBatch,
  filterOptionsBranch,
  setFilterOptionsBranch,
  filterOptionsStatus,
  setFilterOptionsStatus,
}) => {
  const classes = useStyles();
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [show, setShow] = useState([filterOptionsBatch, "batch"]);

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
    setShow([filterOptionsBatch, "batch", setFilterOptionsBatch]);
  };

  const openBranch = (event) => {
    event.stopPropagation();
    setShow([filterOptionsBranch, "branch", setFilterOptionsBranch]);
  };

  const openStatus = (event) => {
    event.stopPropagation();
    setShow([filterOptionsStatus, "status", setFilterOptionsStatus]);
  };

  const handleCheckboxChange = (id, optionType) => {
    let updatedOptions;
    let setUpdatedOptions;

    if (optionType === "batch") {
      updatedOptions = [...filterOptionsBatch];
      setUpdatedOptions = setFilterOptionsBatch;
    } else if (optionType === "branch") {
      updatedOptions = [...filterOptionsBranch];
      setUpdatedOptions = setFilterOptionsBranch;
    } else if (optionType === "status") {
      updatedOptions = [...filterOptionsStatus];
      setUpdatedOptions = setFilterOptionsStatus;
    }

    if (updatedOptions) {
      updatedOptions = updatedOptions.map((option) => {
        if (option.id === id) {
          return { ...option, selected: !option.selected };
        }
        return option;
      });
      setUpdatedOptions(updatedOptions);
    }

    const updatedShow = [
      show[0].map((option) => {
        if (option.id === id) {
          return { ...option, selected: !option.selected };
        }
        return option;
      }),
      show[1],
    ];
    setShow(updatedShow);
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
                    width: "auto",
                    height: "auto",
                    marginTop: "8px",
                    borderRadius: "4px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box>
                    <MenuItem onClick={openBatch} disableRipple>
                      Batch
                    </MenuItem>
                    <MenuItem onClick={openBranch} disableRipple>
                      Branch
                    </MenuItem>
                    <MenuItem onClick={openStatus} disableRipple>
                      Status
                    </MenuItem>
                  </Box>
                  <Box className={classes.filterOptionsContainer}>
                    {show[0].map((option) => (
                      <MenuItem
                        key={option.id}
                        disableRipple
                        sx={{ py: 0, px: 2 }}
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
                  </Box>
                </Box>
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
