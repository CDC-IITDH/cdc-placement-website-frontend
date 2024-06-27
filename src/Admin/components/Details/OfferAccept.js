import {Box, Typography} from "@material-ui/core";
import React from "react";
import {useState} from "react";
import {ChangeOffer} from "../../api/details_page";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import swal from "sweetalert";
import { userTypesContext } from "../../../App.js";

const OfferAccept = ({buttonContent, opening, type, setShowLoader, token, getDashboardInfo}) => {

    const [open, setOpen] = useState(false);
    const [dialog_loading, setDialogLoading] = useState(false);

    const userTypes = React.useContext(userTypesContext);

    const handleClickOpen = () => {
        if (buttonContent === "Offer Approval Pending" && userTypes.includes("s_admin")) {
            setOpen(true);
        }
        else if (buttonContent === "Offer Approval Pending" && ! (userTypes.includes("s_admin"))) {
            swal("Error!","You are not authorized to perform this action","error");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    const decline_styles = {
        bgcolor: "#ef5c5c",
        boxShadow: 1,
        borderRadius: 10,
        p: 1,
        width: "200px",
        cursor: "pointer",
        textAlign: "center",
        margin: "0.25rem",
        "&:hover": {
            transition: "0.3s",
            backgroundColor: "#30363D",
            color: "#ffffff",
            transform: "scale(1.05)",
        },
    };

    const accept_styles = {
            bgcolor: "#34c574",
            boxShadow: 1,
            borderRadius: 10,
            p: 1,
            width: "200px",
            textAlign: "center",
            margin: "0.25rem",
        };

    const pending_styles = {
        bgcolor: "#b1b1b1",
        boxShadow: 1,
        borderRadius: 10,
        p: 1,
        width: "200px",
        cursor: "pointer",
        textAlign: "center",
        margin: "0.25rem",
        "&:hover": {
            transition: "0.3s",
            backgroundColor: "#30363D",
            color: "#ffffff",
            transform: "scale(1.05)",
        },
    };


    return (
        <div>
            <Box sx={buttonContent === "Offer Declined" ? decline_styles : buttonContent === "Offer Approval Pending" ? pending_styles : accept_styles} onClick={handleClickOpen}>
                <Typography variant="h6" style={{color: "#ffffff"}}>{buttonContent}</Typography>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Offer Approval"}</DialogTitle>
                {dialog_loading ?
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress />
                    </div>
                :(
                <>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        NOTE: If you decline the offer, opening will not be visible anymore.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button> */}
                    <Button onClick={() => {
                        swal({
                            title: "Decline Offer?",
                            text: "Once declined, you will not be able to recover this opening!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                                if (willDelete) {
                                let offer_accepted = "false";
                                ChangeOffer(token, opening, type ,offer_accepted).then(res => {
                                    swal("Offer Declined!", {
                                        icon: "success",
                                    });
                                    setDialogLoading(false);
                                    getDashboardInfo();
                                    handleClose();
                                }).catch(err => {
                                    console.log(err);
                                    swal("Error!", "Something went wrong!", "error");
                                    setDialogLoading(false);
                                    handleClose();
                                });
                                setDialogLoading(true);
                                }else{
                                    handleClose();
                                }
                            });

                    }
                    } autoFocus>
                        Decline
                    </Button>
                    <Button onClick={() => {
                        swal({
                            title: "Accept Offer?",
                            text: "Once accepted, you will not be able to decline this opening!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                                if (willDelete) {
                                let offer_accepted = "true";
                                ChangeOffer(token, opening, type, offer_accepted).then(res => {
                                    getDashboardInfo();
                                    swal("Offer Accepted!", {
                                        icon: "success",
                                    });
                                    setDialogLoading(false);
                                    handleClose();
                                }).catch(err => {
                                    console.log(err);
                                    swal("Error!", "Something went wrong!", "error");
                                    setDialogLoading(false);
                                    handleClose();
                                });
                                setDialogLoading(true);
                                } else {
                                handleClose();
                                }
                            });

                    }
                    } autoFocus>
                        Accept
                    </Button>
                </DialogActions>
                </>
                )}
            </Dialog>
        </div>
    );
};


export default OfferAccept;
