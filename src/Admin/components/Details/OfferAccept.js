import {Box, Typography} from "@material-ui/core";
import React from "react";
import {useEffect, useState} from "react";
import API_ENDPOINT from "../../../api/api_endpoint.js";
import {ChangeOffer} from "../../api/details_page";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from "sweetalert";
import { Route } from "react-router-dom";

const OfferAccept = ({buttonContent, opening, setShowLoader, token, getDashboardInfo}) => {

    const [open, setOpen] = useState(false);

    // const handleClickOpen = () => {

    //     var offer_accepted = null;
    //     if (buttonContent === "Offer Declined" || buttonContent === "Offer Approval Pending") {
    //         offer_accepted = true;
    //     } else {
    //         return ;
    //     }
    //     ChangeOffer(token, opening, offer_accepted).then(res => {
    //         getDashboardInfo();

    //         setShowLoader(false);

    //     });
    //     setShowLoader(true);

    // };

    const handleClickOpen = () => {
        if (buttonContent === "Offer Approval Pending") {
            setOpen(true);
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
                                ChangeOffer(token, opening, offer_accepted).then(res => {
                                    getDashboardInfo();
                                });
                                handleClose();
                                swal("Offer Declined!", {
                                    icon: "success",
                                });
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
                                ChangeOffer(token, opening, offer_accepted).then(res => {
                                    getDashboardInfo();
                                });
                                handleClose();
                                swal("Offer Accepted!", {
                                    icon: "success",
                                });
                                } else {
                                handleClose();
                                }
                            });

                    }
                    } autoFocus>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


export default OfferAccept;
