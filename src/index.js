import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Start the mocking conditionally.
if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mocks/browser");
    worker.start();
}

ReactDOM.render( < App / > , document.getElementById("root"));

//   //"proxy": "https://cdc-iitdh.herokuapp.com"