import { React, useState, useMemo, useCallback } from "react";
import Input from "./Input";
import Suggestion from "./suggestion";
import seachBarStyles from "./seachBarStyles";
import { SvgIcon } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

const Searchbar = ({ searchBarInfo }) => {
  const [focused, setFocused] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchBarArray, updateSearchBarArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const css = seachBarStyles();
  var array = [];
  const onSearchSubmit = (term) => {
    array = [];
    searchBarInfo.ongoing.forEach((elem) => {
      if (
        elem.company_details.name.toLowerCase().includes(term.toLowerCase())
      ) {
        if (array.length < 8) {
          array.push(elem);
        }
      }
    });
    searchBarInfo.previous.forEach((elem) => {
      if (
        elem.company_details.name.toLowerCase().includes(term.toLowerCase())
      ) {
        if (array.length < 8) {
          array.push(elem);
        }
      }
    });
    updateSearchBarArray(array);
    console.log(searchBarArray);
  };

  const on_click = () => {
    // console.log("onClick");

    // TODO:
    // set the order of the listing here

    setSearched(true);
  };

  return (
    <div className={css.parent}>
      {
        <Input
          onSearchSubmit={onSearchSubmit}
          focused={focused}
          setFocused={setFocused}
          searched={searched}
          setSearched={setSearched}
          term={searchTerm}
          setTerm={setSearchTerm}
        />
      }
      {searchTerm && !searched && focused && searchBarArray.length > 0 && (
        <ul className={css.suggestions}>
          {searchBarArray.map((elem) => {
            return <Suggestion key={elem.id} suggestion={elem} />;
          })}
          <div className={css.seemore} onMouseDown={on_click}>
            see more.. <SvgIcon component={ArrowRight} />
          </div>
          {/* onMouseDown is similar to onClick, but it is triggered when the user releases the mouse button.
        https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue */}
        </ul>
      )}
      {searchTerm && focused && searchBarArray.length === 0 && (
        <div className={css.suggestions}>
          <div className={css.padding}>No result found</div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
