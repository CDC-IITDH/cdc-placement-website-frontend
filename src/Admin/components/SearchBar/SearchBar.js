import {React, useState, useMemo,useCallback} from 'react';
import Input from './Input';
import seachBarStyles from './seachBarStyles'
const Searchbar = ({searchBarInfo}) => {

  const [searchBarArray,updateSearchBarArray] = useState([]);
  const css = seachBarStyles();
  var array = []
  const onSearchSubmit =((term) =>{
    array = [];
    searchBarInfo.ongoing.forEach((elem) =>{
      if(elem.company_details.name.toLowerCase().includes(term.toLowerCase())){
        array.push(elem.company_details.name)
      }
    })
    searchBarInfo.previous.forEach((elem) =>{
      if(elem.company_details.name.toLowerCase().includes(term.toLowerCase())){  
        array.push(elem.company_details.name)
      }
    })
    updateSearchBarArray(array);
    console.log(searchBarArray);
  })



  return (
    <div className={css.parent}>
      <Input onSearchSubmit={onSearchSubmit}/>
      <div className='main-content'>
      {array.map((elem)=>{return (<h4>{elem}</h4>)})}
      </div>
    </div>
  );
};

export default Searchbar;