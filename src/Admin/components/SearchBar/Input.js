import React, { useEffect, useState } from 'react';
import seachBarStyles from './seachBarStyles'
const Input = ({onSearchSubmit}) => {
    const [term, setTerm] = useState('');

    const css = seachBarStyles();

    useEffect(() => {
        if(term !== ''){
            onSearchSubmit(term);
        }
    }, [term]);

    return (
      <div className={css.searchbar}>
        <input 
            className={css.searchbarinput} 
            type='text' 
            placeholder="Search user by name. . ."
            onChange={e => setTerm(e.target.value)}
            value={term}/>
      </div>
    );
};

export default Input;