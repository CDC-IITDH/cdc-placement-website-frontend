import { React } from "react";
import { SvgIcon } from "@material-ui/core";
import { Work, Ballot } from "@material-ui/icons";

import seachBarStyles from "./seachBarStyles";
import {Link} from "react-router-dom";

const Suggestion = ({ suggestion }) => {
  // text suggestion
  const css = seachBarStyles();
  // ongoing is bool which is true if the suggestion's deadline is in the future
  // console.log(suggestion.deadline_datetime);
  const deadline = new Date(suggestion.deadline_datetime);
  const ongoing = deadline > new Date();
  return (
    <>
      <li className={css.suggestion} >
          <h5 className={css.suggestion_h5}>
          {" "}
          <SvgIcon component={Ballot} /> {suggestion.company_name}
        </h5>
        <div>
          {" "}
          <SvgIcon component={Work} /> {suggestion.designation}
        </div>
        {ongoing ? (
          <div className={css.ongoing}>Ongoing</div>
        ) : (
          <div className={css.previous}>Previous</div>
        )}
      </li>
    </>
  );
};

export default Suggestion;
