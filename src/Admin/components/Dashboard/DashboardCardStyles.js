import { makeStyles } from "@material-ui/core/styles";

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
    display: "grid",
    gridTemplateColumns: "80% 20%",
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
  inner_info: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    [theme.breakpoints.between(400, 1100)]: {
      gridTemplateColumns: "3fr 1fr",
    },
    [theme.breakpoints.down(400)]: {
      gridTemplateColumns: "2fr 1fr",
      gridColumnGap: "5px",
    },
  },
  companyName: {
    marginTop: "5px",
    "& h6": {
      fontSize: "170%",
      "& .MuiSvgIcon-root": {
        fontSize: "108%",
        marginBottom: "7px",
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
  apply_job_button: {
    margin: "auto",
    backgroundColor: " #334878",
    border: "1px solid #c7c7c7",
    borderRadius: "0.8rem",
    color: " #ffffff",
    display: "inline-block",
    textAlign: "center",
    padding: "0.6rem 1rem",

    [theme.breakpoints.down(640)]: {
      width: "40%",
      margin: "auto",
      fontSize: "1rem",
      padding: "0.2rem 1rem",
    },
  },
  applicationCard: {
    width: "95%",
    margin: "10px auto 5px auto",
    borderRadius: "0.4rem",
    padding: "5px",
    boxShadow: "6px 4px 4px 0px rgba(214,214,214,0.75)",
    webkitBoxShadow: "6px 4px 4px 0px rgba(214,214,214,0.75)",
    mozBoxShadow: "6px 4px 4px 0px rgba(214,214,214,0.75)",
    overflow: " hidden",
  },
  detailItems: {
    marginInline: "1rem",
  },
  selectionCard: {
    marginTop: "auto",
    marginBottom: "auto",
    paddingBlock: "0.2rem",
    paddingInline: "0.4rem",
    display: "inline-block",
    width: "8rem",
    height: "3rem",
    color: "#808185",
    marginLeft: "30%",
    border: "3px solid #808185",
    boxShadow: "6px 4px 4px 0px rgba(214,214,214,0.75)",
    outlineOffset: "2rem",
    [theme.breakpoints.between(900, 1100)]: {
      width: "8rem",
      marginLeft: "15%",
      height: "3rem",
    },
    [theme.breakpoints.between(640, 900)]: {
      width: "5.5rem",
      marginLeft: "7%",
      height: "3.5rem",
    },
    [theme.breakpoints.down(640)]: {
      width: "40%",
      height: "3rem",
      margin: "auto",
      marginBottom: "10px",
    },
  },
  selectionStatusTitle: {
    fontSize: "0.6rem",
    [theme.breakpoints.between(640, 900)]: {
      fontSize: "0.5rem",
    },
    [theme.breakpoints.down(640)]: {
      fontSize: "0.7rem",
    },
  },
  selectionStatusSubtitle: {
    fontSize: "0.9rem",
    paddingLeft: "0.5rem",
    fontWeight: "bold",
    [theme.breakpoints.between(640, 900)]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down(640)]: {
      fontSize: "0.8rem",
      paddingLeft: "0",
    },
  },
  selectionCardAccepted: {
    color: "#46b069!important",
    border: "3px solid #46b069!important",
    width: "fit-content",
    height: "auto",
    padding: "0.3rem 0.7rem",
    borderRadius: "10px",
  },
  selectionCardRejected: {
    border: "3px solid #F70000!important",
    color: "#F70000!important",
    width: "fit-content",
    height: "auto",
    padding: "0.3rem 0.7rem",
    borderRadius: "10px",
  },
  selectionStatusText: {
    fontWeight: 600,
    fontSize: "0.8rem",
  },
  applicationGridContainer: {
    marginLeft: "3%",
  },
  applicationTitleGrid1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBlock: "1rem",
    [theme.breakpoints.down(680)]: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
      marginBlock: "0.5rem",
    },
  },
  applicationTitleElements: {
    [theme.breakpoints.between(680, 800)]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.between(475, 680)]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down(475)]: {
      fontSize: "1.5rem",
    },
  },
  applicationTitleStatus: {
    [theme.breakpoints.down(475)]: {
      marginInline: "0",
    },
  },
  selectionCardApplication: {
    margin: "auto",
    paddingBlock: "0.2rem",
    paddingInline: "0.4rem",
    display: "inline-block",
    color: "#808185",
    border: "3px solid #808185",
    outlineOffset: "2rem",
    [theme.breakpoints.up(1100)]: {
      margin: '5px 0px 5px 30%'
    },
    [theme.breakpoints.between(596, 1100)]: {
      margin: '5px 0px 5px 0px'
    },
    [theme.breakpoints.down(596)]: {
    margin: '5px 0px 5px 30%'

    },
  },
}));
