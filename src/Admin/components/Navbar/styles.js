import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    padding: theme.spacing(2, 0, 2),
    alignContent: "center",
    backgroundColor: "#334878",
    background: 'linear-gradient(90deg, rgba(51, 72, 120, 1) 25%, rgba(65, 93, 156, 1) 100%)'
  },
  links: {
    textDecoration: "none",
    color: "#000000",
    width:'100%'
  },
  navbarLinks: {
    textDecoration: "none",
    color: "#fff",
    transition: "0.1s",
    padding: "0.25rem",
    fontWeight: '600',
    "&:hover": {
      textDecoration: "none",
      color: "#fff",
      borderBottom: "1px solid #fff",
    },
  },
}));
