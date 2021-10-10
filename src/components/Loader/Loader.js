import React from "react";
import "./loaderStyles.css";
const Loader = (props) => {
  return (
    <div>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
        
      </div>
      <span className="spinner-text" >Designed&nbsp;and&nbsp;Developed by Students&nbsp;of&nbsp;IIT&nbsp;Dharwad</span>
      
    </div>
  );
};

export default Loader;
