import { React } from "react";
import { SvgIcon } from "@material-ui/core";
import { Work, Ballot } from "@material-ui/icons";

import seachBarStyles from "./seachBarStyles";

const Suggestion = ({ suggestion }) => {
  // text suggestion
  const css = seachBarStyles();
  const ongoing = suggestion.status === "Accepting Applications";
  return (
    <>
      <li className={css.suggestion}>
        <h5>
          {" "}
          <SvgIcon component={Ballot} /> {suggestion.company_details.name}
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
