import SideButtons from "./SideButtons";
import DeadlineCard from "./DeadlineCard";
import OfferAccept from "./OfferAccept";
import useStyles from "./styles";

const Details = ({opening, setShowLoader, token, getDashboardInfo, type}) => {
    const classes = useStyles();

    const offerBtn = () => {
        console.log(opening.id, opening.offer_accepted === true);

        if (opening && opening.offer_accepted === true) {

            return (
                <OfferAccept buttonContent={'Offer Accepted'} opening={opening.id} setShowLoader={setShowLoader}
                             token={token} getDashboardInfo={getDashboardInfo}/>
            );
        } else if (opening && opening.offer_accepted === false) {
            return (
                <OfferAccept buttonContent='Offer Declined' opening={opening.id} setShowLoader={setShowLoader}
                             token={token} getDashboardInfo={getDashboardInfo}/>
            );
        } else {
            return (
                <OfferAccept buttonContent={'Offer Approval Pending'} opening={opening.id} setShowLoader={setShowLoader}
                             token={token} getDashboardInfo={getDashboardInfo}/>
            );
        }
    }


    return (
        <div className={classes.sidebar}>
            <div className={classes.dropdownContainer}>
                {opening ? <SideButtons buttonContent='Job Description' id={opening.id} type={type}/> : ""}

                {/*<SideButtons buttonContent='Student List' />*/}
            </div>
            <div className={classes.deadlineContainer}>
                {opening ? <DeadlineCard opening_offer_accepted={opening.offer_accepted}
                                         deadline_datetime={opening.deadline_datetime} setShowLoader={setShowLoader}
                                         token={token} getDashboardInfo={getDashboardInfo}
                                         opening_id={opening.id}/> : ""}

            </div>
            <div className={classes.dropdownContainer}>
                {opening ? offerBtn() : ""}
            </div>
        </div>
    );
};

export default Details;
