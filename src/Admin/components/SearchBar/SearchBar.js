
import { React, useState,
   useRef } from "react";

import Input from "./Input";
import Suggestion from "./suggestion";
import seachBarStyles from "./seachBarStyles";
import { SvgIcon } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

const Searchbar = ({ searchBarInfo, setDashboardview, searched, setSearched, dashboardInfo, searchTerm, setSearchTerm}) => {
  const [focused, setFocused] = useState(false);
  const [searchBarArray, updateSearchBarArray] = useState([]);
  const css = seachBarStyles();
  const searchInput = useRef(null);

  var array = [];
  const onSearchSubmit = (term) => {
      array = [];
      for (let i = 0; i < searchBarInfo.ongoing.length; i++) {
       if (array.length < 8){
        if (searchBarInfo.ongoing[i].company_name.toLowerCase().includes(term.toLowerCase())) {
          array.push(searchBarInfo.ongoing[i]);
        }
       }
      }
      for (let i = 0; i < searchBarInfo.new.length; i++) {
       if (array.length < 8){
        if (searchBarInfo.new[i].company_name.toLowerCase().includes(term.toLowerCase())) {
          array.push(searchBarInfo.new[i]);
        }
       }
      }
      for (let i = 0; i < searchBarInfo.previous.length; i++) {
       if (array.length < 8){
        if (searchBarInfo.previous[i].company_name.toLowerCase().includes(term.toLowerCase())) {
          array.push(searchBarInfo.previous[i]);
        }
       }
      }
        updateSearchBarArray(array);

  };
  const on_click = (e) => {
    e.preventDefault();

    var ongoing_array = [];

    dashboardInfo[0].ongoing.forEach((elem) => {
      if (elem.company_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        ongoing_array.push(elem);
      }
    });
    var new_array = [];
    searchBarInfo.new.forEach((elem) => {
      if (
        elem.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        new_array.push(elem);
      }
    });

    var previous_array = [];
    searchBarInfo.previous.forEach((elem) => {
      if (
        elem.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        previous_array.push(elem);
      }
  });
    var new_json = {
      ongoing: ongoing_array,
      previous: previous_array,
      new: new_array,
    };
    setDashboardview(new_json);
    searchInput.current.blur();

    setSearched(searchTerm);
    setFocused(false);
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
          on_click={on_click}
          dashboardInfo={dashboardInfo}
          setDashboardview={setDashboardview}
          inputRef={searchInput}

        />
      }
      {searchTerm  && focused && searchBarArray.length > 0 && (
        <ul className={css.suggestions}>
          {searchBarArray.map((elem) => {
            return <Suggestion key={elem.id} suggestion={elem} />;
          })}
          <div className={css.seemore} onMouseDown={on_click}>
            see more.. <SvgIcon component={ArrowRight} />
          </div>
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
