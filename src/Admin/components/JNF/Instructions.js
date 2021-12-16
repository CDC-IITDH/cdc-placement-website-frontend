
import logo from "../../images/cdc_logo.png"
import { Row } from "react-bootstrap";

const Instructions = ({year}) => {
  return (
    <>
    <Row className="m-5 text-center justify-content-center">
      <img src={logo} className="w-75 logo" alt="logo" />
    </Row>
    <Row className="p-3 text-center justify-content-center">
      <h3><b>Job Notification Form</b></h3>
      <h6>{year}</h6>
    </Row>
    <hr className="pd" />
    <Row className="p-3 gray-blue">
      <h4><b>Instructions:</b></h4>
      <div className="p-3">
        <ul>
          <li>
            Student's choices will be governed by the information you provide in this form. Therefore please be as clear and detailed as possible.
          </li>
          <li>
            Before filling the form kindly refer to the <a href="https://drive.google.com/file/d/13_qduU5w51fdu7YfOtOjGNadX3qziDDV/view">placement brochure</a> and the <a href="https://cdc.iitdh.ac.in/">placement website</a> for the selection process and rules & regulations.
          </li>
        </ul>
      </div>
    </Row>
    </>
  )
}

export default Instructions