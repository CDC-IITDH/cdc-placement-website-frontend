import SideButtons from "./SideButtons";
import DeadlineCard from "./DeadlineCard";
import useStyles from "./styles";

const Details = () => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <div className={classes.dropdownContainer}>
        <SideButtons buttonContent='Job Description' />
        <SideButtons buttonContent='Student List' />
      </div>
      <div className={classes.deadlineContainer}>
        <DeadlineCard />
      </div>
    </div>
  );
};

export default Details;
