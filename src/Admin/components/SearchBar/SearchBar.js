import { React, useState, useMemo, useCallback } from "react";
import Input from "./Input";
import Suggestion from "./suggestion";
import seachBarStyles from "./seachBarStyles";
import { SvgIcon } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

const Searchbar = ({ dashboardview, setDashboardview, searched, setSearched, dashboardInfo, searchTerm, setSearchTerm, clearSearch, setShowLoader}) => {
  const [focused, setFocused] = useState(false);
  const [searchBarArray, updateSearchBarArray] = useState([]);
  const css = seachBarStyles();
  var array = [];
  const onSearchSubmit = (term) => {
      array = [];
      console.log("term", dashboardInfo[0]);
      for (let i = 0; i < dashboardInfo[0].ongoing.length; i++) {
        if (array.length < 5) {
          if (dashboardInfo[0].ongoing[i].company_name.toLowerCase().includes(term.toLowerCase())) {
            array.push(dashboardInfo[0].ongoing[i]);
          }
        }
        else{
          break;
        }
      }
      for (let i = 0; i < dashboardInfo[0].previous.length; i++) {
        if (array.length < 5) {
          if (dashboardInfo[0].previous[i].company_name.toLowerCase().includes(term.toLowerCase())) {
            array.push(dashboardInfo[0].previous[i]);
          }
        }
        else{
          break;
        }
      }
        updateSearchBarArray(array);
  };

  const on_click = (e) => {
    e.preventDefault();
    console.log(dashboardInfo[0]);
    console.log(dashboardview);
    console.log("clicked");
    // make new json object with ongoing and previous members
    var ongoing_array = [];
  //   dashboardview.ongoing.forEach((elem) => {
  //     if (
  //       elem.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     ) {
  //       ongoing_array.push(elem);
  //     }
  //   });
  //   var previous_array = [];
  //   dashboardview.previous.forEach((elem) => {
  //     if (
  //       elem.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     ) {
  //       previous_array.push(elem);
  //     }
  // });

    dashboardInfo[0].ongoing.forEach((elem) => {
      if (elem.company_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        ongoing_array.push(elem);
      }
    });
    var previous_array = [];
    dashboardInfo[0].previous.forEach((elem) => {
      if (elem.company_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        previous_array.push(elem);
      }
    });
    var new_json = {
      ongoing: ongoing_array,
      previous: previous_array,
    };
    setDashboardview(new_json);
    setFocused(false);
    setSearched(searchTerm);
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
