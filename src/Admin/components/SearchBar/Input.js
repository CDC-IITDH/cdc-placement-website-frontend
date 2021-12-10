import React, { useEffect } from "react";
import seachBarStyles from "./seachBarStyles";
import { SvgIcon } from "@material-ui/core";
import { Search, Close } from "@material-ui/icons";

const Input = ({
  onSearchSubmit,
  focused,
  setFocused,
  suggestions,
  searchClick,
  searched,
  setSearched,
  term,
  setTerm,
}) => {
  const css = seachBarStyles();

  const onClick = () => {
    setFocused(true);
    document.getElementById("searchbar").style.border = "2px solid #334878";
  };

  const onBlur = () => {
    setFocused(false);
    document.getElementById("searchbar").style.border = "2px solid #ccc";
  };

  useEffect(() => {
    if (term !== "") {
      onSearchSubmit(term);
    }
  }, [term]);

  const clearSearch = () => {
    setTerm("");
    setSearched(false);
    // TODO:
    // clear the order of the listings here.
  };

  return (
    <div className={css.searchbar} id="searchbar">
      <SvgIcon component={Search} style={{ Width: "5%" }} />
      <input
        className={css.searchbarinput}
        type="text"
        placeholder="Search offer by company name. . ."
        onClick={onClick}
        onBlur={onBlur}
        onChange={(e) => setTerm(e.target.value)}
        value={term}
        disabled={searched ? searched : false}
      />
      <button className={css.searchButton}> Search </button>
      {/* {searched && (
        <SvgIcon
          component={Close}
          onClick={clearSearch}
          className={css.close}
        />
      )} */}
    </div>
  );
};

export default Input;
