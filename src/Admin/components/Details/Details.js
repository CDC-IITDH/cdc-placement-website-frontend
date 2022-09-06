import SideButtons from "./SideButtons";
import DeadlineCard from "./DeadlineCard";
import OfferAccept from "./OfferAccept";
import useStyles from "./styles";
import ManageAdditionalInfo from "./ManageAdditionalInfo";

const Details = ({
  opening,
  setShowLoader,
  token,
  getDashboardInfo,
  type,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
}) => {
  const classes = useStyles();

  const offerBtn = () => {

    if (opening && opening.offer_accepted === true) {
      return (
        <OfferAccept
          buttonContent={"Offer Accepted"}
          opening={opening.id}
          setShowLoader={setShowLoader}
          token={token}
          getDashboardInfo={getDashboardInfo}
        />
      );
    } else if (opening && opening.offer_accepted === false) {
      return (
        <OfferAccept
          buttonContent="Offer Declined"
          opening={opening.id}
          setShowLoader={setShowLoader}
          token={token}
          getDashboardInfo={getDashboardInfo}
        />
      );
    } else {
      return (
        <OfferAccept
          buttonContent={"Offer Approval Pending"}
          opening={opening.id}
          setShowLoader={setShowLoader}
          token={token}
          getDashboardInfo={getDashboardInfo}
        />
      );
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.dropdownContainer}>
        {opening ? (
          <SideButtons
            buttonContent="Job Description"
            id={opening.id}
            type={type}
          />
        ) : (
          ""
        )}

        {/*<SideButtons buttonContent='Student List' />*/}
      </div>
      <div className={classes.deadlineContainer}>
        {opening ? (
          <DeadlineCard
            opening_offer_accepted={opening.offer_accepted}
            deadline_datetime={opening.deadline_datetime}
            setShowLoader={setShowLoader}
            token={token}
            getDashboardInfo={getDashboardInfo}
            opening_id={opening.id}
            setError={setError}
            setShowError={setShowError}
            setSuccess={setSuccess}
            setShowSuccess={setShowSuccess}
          />
        ) : (
          ""
        )}
      </div>
      <div className={classes.dropdownContainer}>
        {opening ? offerBtn() : ""}
      </div>
      <div className={classes.additionalInfoContainer}>
        {opening && opening.offer_accepted !== true ? (
          <ManageAdditionalInfo
            additional_info={opening.additional_info}
            setError={setError}
            setShowError={setShowError}
            setSuccess={setSuccess}
            setShowSuccess={setShowSuccess}
            setShowLoader={setShowLoader}
            token={token}
            getDashboardInfo={getDashboardInfo}
            opening_id={opening.id}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Details;
