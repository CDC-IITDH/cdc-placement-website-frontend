import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  parent: {
    marginLeft: "5%",
    width: "90%",
    "@media (min-width:800px)": {
      width: "40%",
    },
    position: "relative",
  },
  searchbar: {
    padding: "0.4rem",
    marginTop: "2rem",
    marginBottom: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    overflow: "hidden",
  },
  searchbarinput: {
    fontSize: "0.9rem",
    position: "relative",
    paddingLeft: "0",
    border: "None",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    outline: "none",
    "&:focus": {
      "&:suggestions": {
        display: "block",
      },
    },
  },
  suggestions: {
    position: "absolute",
    top: "85%",
    left: "0",
    width: "100%",
    padding: "0",
    backgroundColor: "#fff",
    border: "2px solid #334878",
    borderTop: "1px solid #ccc",
    borderBottomLeftRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
    zIndex: "1",
    listStyle: "none",
    overflow: "hidden",
  },
  suggestion: {
    padding: "0.2rem",
    position: "relative",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
    borderTop: "None",
    "&:hover": {
      backgroundColor: "#334878",
      color: "#fff",
      "& button": {
        display: "block",
      },
    },
    overflow: "hidden",
  },
  ongoing: {
    position: "absolute",
    fontSize: "0.8rem",
    right: "0.5rem",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#4ba62d",
    color: "#fff",
    border: "None",
    borderRadius: "0.5rem",
    padding: "0.5rem",
  },
  previous: {
    position: "absolute",
    fontSize: "0.8rem",
    right: "0.5rem",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#fa3737",
    color: "#fff",
    border: "None",
    borderRadius: "0.5rem",
    padding: "0.5rem",
  },
  padding: {
    padding: "0.2rem",
  },
  seemore: {
    float: "right",
    fontSize: "0.8rem",
    color: "#334878",
    cursor: "pointer",
  },
  close: {
    position: "absolute",
    right: "0.5rem",
    top: "50%",
    transform: "translateY(-50%)",
    overflow: "hidden",
  },
  searchButton: {
    position: "absolute",
    right: "0.5rem",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#334878",
    color: "#fff",
    border: "None",
    borderRadius: "0.5rem",
    padding: "0.2rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  form: {
    display: "inline",

  },
  searchbarico: {
    color: "#bbb",
    cursor:"pointer",
    "&:hover": {
      color: "#000",
    },
    overflow: "hidden",
  },
  suggestion_h5:{
marginBottom: "0.2rem",
  }
}));
