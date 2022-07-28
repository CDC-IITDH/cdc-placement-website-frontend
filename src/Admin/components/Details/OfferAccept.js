import {Box, Typography} from "@material-ui/core";
import React from "react";
import {useEffect, useState} from "react";
import API_ENDPOINT from "../../../api/api_endpoint.js";
import {ChangeOffer} from "../../api/details_page";

const OfferAccept = ({buttonContent, opening, setShowLoader, token, getDashboardInfo}) => {

    const changeScreen = () => {

        var offer_accepted = null;
        if (buttonContent === "Offer Declined" || buttonContent === "Offer Approval Pending") {
            offer_accepted = true;
        } else {
return ;
        }
        ChangeOffer(token, opening, offer_accepted).then(res => {
            getDashboardInfo();

            setShowLoader(false);

        });
        setShowLoader(true);

    };

    if (buttonContent === "Offer Declined") {
        return (
            <Box
                onClick={changeScreen}
                sx={{
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
                }}
            >
                <Typography>{buttonContent}</Typography>
            </Box>
        );
    } else if (buttonContent === "Offer Accepted") {
        return (
            <Box
                onClick={changeScreen}
                sx={{
                    bgcolor: "#34c574",
                    boxShadow: 1,
                    borderRadius: 10,
                    p: 1,
                    width: "200px",
                    textAlign: "center",
                    margin: "0.25rem",

                }}
            >
                <Typography>{buttonContent}</Typography>
            </Box>
        );
    } else if (buttonContent === "Offer Approval Pending") {
        return (

            <Box
                onClick={changeScreen}
                sx={{
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
                }}
            >
                <Typography>{buttonContent}</Typography>
            </Box>
        );
    } else {
        return <Box></Box>
    }

};

export default OfferAccept;
