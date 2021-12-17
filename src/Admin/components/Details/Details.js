import SideButtons from "./SideButtons";
import DeadlineCard from "./DeadlineCard";
import useStyles from "./styles";

const Details = ({ reqJobPosting, openingId, token, setdashboardInfo }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <div className={classes.dropdownContainer}>
        <SideButtons buttonContent='Job Description' />
        <SideButtons buttonContent='Student List' />
      </div>
      <div className={classes.deadlineContainer}>
        <DeadlineCard
          reqJobPosting={reqJobPosting}
          openingId={openingId}
          token={token}
          setdashboardInfo={setdashboardInfo}
        />
      </div>
    </div>
  );
};

export default Details;
