import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    dashboardCard: {
        width: "95%",
        margin: "10px auto 5px auto",
        borderRadius: "0.4rem",
        padding: "5px",
        boxShadow: "6px 4px 4px 0px rgba(214,214,214,0.75)",
        webkitBoxShadow: "6px 4px 4px 0px rgba(214,214,214,0.75)",
        mozBoxShadow: "6px 4px 4px 0px rgba(214,214,214,0.75)",
        overflow: " hidden",
        [theme.breakpoints.down(640)]: {
            gridTemplateColumns: "100%",
        },
    },
    basicInfo: {
        marginLeft: "3%",
        "& .MuiSvgIcon-root": {
            fontSize: "110%",
            marginBottom: "3px",
        },
        [theme.breakpoints.between(600, 800)]: {
            fontSize: "80%",
        },
        [theme.breakpoints.between(400, 600)]: {
            fontSize: "70%",
        },
        [theme.breakpoints.down(400)]: {
            fontSize: "70%",
        },
        "& h6": {
            [theme.breakpoints.between(600, 800)]: {
                fontSize: "93%",
            },
            [theme.breakpoints.between(400, 600)]: {
                fontSize: "100%",
            },
            [theme.breakpoints.down(400)]: {
                fontSize: "100%",
            },
        },
    },
    applicationInfo: {
        "& .MuiSvgIcon-root": {
            fontSize: "110%",
            marginBottom: "3px",
        },
        [theme.breakpoints.between(600, 800)]: {
            fontSize: "80%",
        },
        [theme.breakpoints.between(400, 600)]: {
            fontSize: "70%",
        },
        [theme.breakpoints.down(400)]: {
            fontSize: "70%",
        },
        "& h6": {
            padding: '10px',
            [theme.breakpoints.between(600, 800)]: {
                fontSize: "93%",

            },
            [theme.breakpoints.between(400, 600)]: {
                fontSize: "100%",
            },
            [theme.breakpoints.down(400)]: {
                fontSize: "100%",
            },
        },
    },

    companyName: {

        "& h6": {
            fontSize: "170%",
            "& .MuiSvgIcon-root": {
                fontSize: "108%",
                marginBottom: "7px",
            },
            [theme.breakpoints.up(596)]: {
                marginTop: "10px",
            },
        },
    },
    divider: {
        backgroundColor: "#444444",
        height: "2px !important",
        borderRadius: "30%",
        marginBottom: "15px",
        marginTop: "10px",
    },
    contact: {
        marginLeft: "auto",

        "& h6": {
            fontSize: "140%",
            "& .MuiSvgIcon-root": {
                fontSize: "98%",
                marginBottom: "4px",
            },

        },
        [theme.breakpoints.up(596)]: {
            marginTop: "15px",
        },
    }
}));
