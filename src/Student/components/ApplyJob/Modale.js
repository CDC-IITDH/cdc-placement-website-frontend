import React, { useState, Fragment, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import "./modal.css";
import { PostApplication } from "../../api/dashboard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
function Modale({
  token,
  show,
  setShow,
  handleClose,
  company,
  designation,
  compensation,
  additionalInfo,
  profileInfo,
  type,
  id,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  setShowLoader,
  getDashboardInfo
}) {
  var initialResume = "";
  if (profileInfo && profileInfo.resume_list.length) {
    initialResume = profileInfo.resume_list[0];
  } else {
    initialResume = null;
  }
  const [resume, setResume] = useState(initialResume);

  const InitialAdditionalInfo = () => {
    var data = {};
    additionalInfo.map((item, i) => {
      data[item] = "";
      return true;
    });
    return data;
  };

  const InitialErrorState = () => {
    var errorState = [];
    additionalInfo.map((item, i) => {
      errorState[item] = false;
      return true;
    });
    return errorState;
  };

  const [additionalTextInfo, updateAdditionalTextInfo] = useState(
    InitialAdditionalInfo
  );

  const [resumeErrorState, setResumeErrorState] = useState(false);

  const [errorState, setErrorState] = useState(InitialErrorState);

  useEffect(() => {
    if (profileInfo && profileInfo.resume_list.length) {
      if (resume !== profileInfo.resume_list[0]) setResume(profileInfo.resume_list[0]);
    } else {
      if (resume !== null) setResume(null);
    }
    return true;
  }, [profileInfo]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "resume") {
      if (value == null) {
        setResumeErrorState(true);
      } else {
        setResumeErrorState(false);
      }
      const resume_obj = profileInfo.resume_list.find(
        resume => resume.name === value
      );
      setResume(resume_obj);
    } else {
      var errorStateTemp = errorState;
      if (value === "") {
        errorStateTemp[name] = true;
      } else {
        errorStateTemp[name] = false;
      }
      setErrorState(errorStateTemp);

      updateAdditionalTextInfo((prevValue) => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
    }
  }

  const SendData = async () => {
    if (token) {
      var errorStateTemp = errorState;
      additionalInfo.map((item, i) => {
        if (additionalTextInfo[item] === "") {
          errorStateTemp[item] = true;
          return true;
        } else {
          errorStateTemp[item] = false;
          return false;
        }
      });
      setErrorState(errorStateTemp);
      const allFieldsFilled = additionalInfo.every((elem) => {
        return (
          additionalTextInfo.hasOwnProperty(elem) &&
          additionalTextInfo[elem] !== ""
        );
      });
      if (resume == null) {
        setResumeErrorState(true);
      } else {
        setResumeErrorState(false);
      }
      if (resume && allFieldsFilled) {
        const data = {
          opening_type: type === "placements" ? "Placement" : "Internship",
          opening_id: id,
          resume_file_name: resume.name,
          additional_info: additionalTextInfo,
        };
        setShowLoader(true);
        PostApplication(token, data)
          .then((res) => {
            getDashboardInfo();
            setShow(false);
            setShowLoader(false);
            setSuccess("Application Submited Successfully");
            setShowSuccess(true);
            
          })
          .catch((err) => {
            setShow(false);
            setShowLoader(false);
            setError("Unable to Submit Application. Please Try Again");
            setShowError(true);
          });
        
      } else {
        setError("Please Fill All the Fields");
        setShowError(true);
      }
    }
  };

  const toProperCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  return profileInfo ? (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="modale-title">
            Application
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-div">
            <h4 align="center" className="modale-info-name">
              Hello {profileInfo.name}!
            </h4>

            <div className="modal-field-parent">
              <Container>
                <Row>
                  <Col xs={12} sm={6}>
                    <div className="modale-field-key">Company:</div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="modale-field-value">{company}</div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="modal-field-parent">
              <Container>
                <Row>
                  <Col xs={12} sm={6}>
                    <div className="modale-field-key">Designation:</div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="modale-field-value">{designation}</div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="modal-field-parent">
              <Container>
                <Row>
                  <Col xs={12} sm={6}>
                    <div className="modale-field-key">Compensation - CTC:</div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="modale-field-value"> {compensation.toLocaleString('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                maximumFractionDigits: "0"
                                            })}</div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <Alert severity="warning">All fields are compulsory</Alert>
          <br />

          <form noValidate autoComplete="off">
            {additionalInfo.map((label, i) => {
              return (
                <div className="Parent" key={i}>
                  <h2 className="label">{label}</h2>
                  <h2 className="label colon">{":"}</h2>
                  <TextField
                    id={"outlined-basic-" + i.toString()}
                    label={toProperCase(label)}
                    name={label}
                    onChange={handleInputChange}
                    variant="outlined"
                    value={additionalTextInfo[label]}
                    error={errorState[label]}
                    required
                  />
                </div>
              );
            })}
            {resume ? (
              <div className="Parent">
                <h2 className="label">Resume</h2>
                <h2 className="label colon">{":"}</h2>
                <NativeSelect
                  onChange={handleInputChange}
                  value={resume}
                  name="resume"
                  error={resumeErrorState}
                  inputProps={{
                    name: "resume",
                    id: "resume-selector",
                  }}
                >
                  {profileInfo.resume_list.map((resume, i) => {
                    return (
                      <option value={resume.name} key={i}>
                        {resume.name.substring(16)}
                      </option>
                    );
                  })}
                </NativeSelect>
              </div>
            ) : (
              <Alert severity="error">
                Please Upload Resume in Profile to Continue
              </Alert>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {resume ? (
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                Swal
                  .fire({
                    title: "Submit Application?",
                    text: "Once submitted, you will not be able to make any change!",
                    icon: "warning",
                    buttons: true,
                    showCancelButton: true,
                    dangerMode: true,
                  })
                  .then((submit) => {
                    if (submit.isConfirmed) {
                      SendData().then(() => {
                        setSuccess("Application Submited Successfully");
                        setShowSuccess(true);
                      }).catch((err) => {
                        setError("Unable to Submit Application. Please Try Again");
                        setShowError(true);
                      });
                    }
                  });
              }}
              disabled={false}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              onClick={SendData}
              disabled={true}
            >
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>
  ) : (
    ""
  );
}

export default Modale;
