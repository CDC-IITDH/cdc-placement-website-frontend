import React from "react";
import Details from "./Details";
import Header from "./Header";
import useStyles from "./styles";

const DetailsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Details />
      <Header />
    </div>
  );
};

export default DetailsPage;
