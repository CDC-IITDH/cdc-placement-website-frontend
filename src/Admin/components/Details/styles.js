import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  sidebar: {
    height: "100vh",
    width: "300px",
    backgroundColor: "#e5e1e1",
  },
  dropdownContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "0.5rem",
    marginTop: "2rem",
    marginBottom: "4rem",
  },
  deadlineContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "0.5rem",
  },
  buttons: {
    margin: "0.25rem",
    boxShadow: "0px 0px 0px",
  },
  mainPageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "8rem",
  },
  headerContainer: {
    display: "flex",
    flexGrow: "1",
    flexDirection: "row",
    justifyContent: "space-between",
    marginInline: "2rem",
    marginBlock: "1.5rem",
  },
  appliedStudents: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E1E1",
    borderRadius: "20px",
    height: "100px",
    paddingInline: "1.5rem",
  },
  appliedStudentsInner: {
    paddingInline: "1rem",
  },
  appliedText: {
    fontSize: "15px",
    textAlign: "right",
  },
  peopleIcon: {
    color: "#00C3BC",
    width: "40px",
    height: "40px",
  },
  addIcon: {
    color: "#000000",
    width: "40px",
    height: "40px",
  },
  printIcon: {
    color: "#000000",
    width: "40px",
    height: "40px",
  },
  otherFunctions: {
    display: "flex",
    flexDirection: "row",
  },
  otherFunctionButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E5E1E1",
    borderRadius: "20px",
    width: "120px",
    height: "100px",
    justifyContent: "center",
    marginInline: "0.5rem",
    textAlign: "center",
    fontSize: "0.2rem",
    cursor: "pointer",
    border: "2px solid transparent",
    "&:hover": {
      transition: "0.2s",
      backgroundColor: "#d6d1d1",
      transform: "scale(1.05)",
    },
  },
  buttonText: {
    fontSize: "12px",
  },
  divider: {
    padding: "0.1rem",
    marginInline: "2rem",
    width: "95%",
    backgroundColor: "#707070",
    borderRadius: "0.25rem",
  },
  dividerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  studentCardContainer: {
    display: "flex",
    flexWrap: "true",
    marginInline: "2rem",
    marginBlock: "3rem",
  },
}));
