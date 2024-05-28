import logo from "../../images/CDC-Logo.png";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Autofill from "./Autofill";
import TierTable from "./TierTable";

const Instructions = ({ year, updateData }) => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const handleClick = (e) => {
    Autofill(e, updateData);
  };

  return (
    <>
      {/* <Row className="m-5 text-center justify-content-center">
        <img src={logo} className="w-75 logo" alt="logo" />
      </Row> */}
      {/* <Row className="p-3 text-center justify-content-center">
        <h3>
          <b>Job Notification Form</b>
        </h3>
        <h6>{year}</h6>
      </Row> */}
      {/* <hr className="pd" /> */}
      <Row className="p-3 gray-blue">
        <h4>
          <b>Instructions:</b>
        </h4>
        <div className="p-3">
          <ul>
            <li>
              Student's choices will be governed by the information you provide
              in this form. Therefore please be as clear and detailed as
              possible.
            </li>
            <li>
              Before filling the form kindly refer to the{" "}
              <a href="https://drive.google.com/file/d/1QpP0K4J6AXiFcezI-mBRzrpesci0gsAh/view">
                placement brochure
              </a>{" "}
              and the <a href="https://cdc.iitdh.ac.in/">placement website</a>{" "}
              for the selection process and rules & regulations.
            </li>
            <li>
              If you have filled jnf already for some other roles, you can save
              time by prefilling the JNF form by company ID{" "}
              <Link to="" onClick={handleClick}>
                {" "}
                click here
              </Link>
            </li>
            <li>
              The placement system is teir based. Check the how we classify
              companies{" "}
              <a onClick={toggleTable} href="#tier-table">
                here
              </a>
              .
              <TierTable show={showTable} />
            </li>
          </ul>
        </div>
      </Row>
    </>
  );
};

export default Instructions;
