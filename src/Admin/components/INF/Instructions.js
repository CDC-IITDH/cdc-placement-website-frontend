import logo from "../../images/CDC-Logo.png";
import { Row, Col } from "react-bootstrap";

const Instructions = ({ year }) => {
  return (
    <>
      {/* <Row className="m-5 text-center justify-content-center">
        <img src={logo} className="w-75 logo" alt="logo" />
      </Row>
      <Row className="p-3 text-center justify-content-center">
        <h3>
          <b>Internship Notification Form</b>
        </h3>
        <h6>{year}</h6>
      </Row>
      <hr className="pd" /> */}
      <Row className="p-3 gray-blue">
        <Col xs={12}>
          <h4>
            <b>Instructions:</b>
          </h4>
        </Col>
        <Col xs={12} className="p-3 ">
          <ul>
            <li>
              Student's choices will be governed by the information you provide
              in this form. Therefore please be as clear and detailed as
              possible.
            </li>
            <li>
              Before filling the form kindly refer to the{" "}
              <a href="https://drive.google.com/file/d/12pAxMUUjzrhTeVq0xXWOv84mGW_dbEvO/view">
                placement brochure
              </a>{" "}
              and the <a href="https://cdc.iitdh.ac.in/">placement website</a>{" "}
              for the selection process and rules & regulations.
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default Instructions;
