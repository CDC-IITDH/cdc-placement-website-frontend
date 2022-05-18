import { useState, useEffect } from "react";
import "./AddStudent.css";
import { Modal, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import NativeSelect from "@material-ui/core/NativeSelect";
import { CircularProgress } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import editApplication from "../../api/editApplication";



const EditStudent = ({ show, setShow, reqJobPosting, token, student_name, student_branch, student_batch, student_id, resume_file_names, application_id, additional_info }) => {
  const [resume, setResume] = useState(resume_file_names[0].name);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [resumeErrorState, setResumeErrorState] = useState(false);
  const [errorState, setErrorState] = useState({});
  console.log(JSON.parse(additional_info));
  console.log(reqJobPosting?.additional_info);
  const [additionalTextInfo, updateAdditionalTextInfo] = useState(JSON.parse(additional_info));


  const handleClose = () =>{
    setShow(false);
    updateAdditionalTextInfo(JSON.parse(additional_info));
    setSuccess(false);
    setError(null);
    setErrorState({});
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(additionalTextInfo);
    console.log(JSON.parse(additional_info));
    if (name === "resume") {
      console.log(value, "Resume state");
      if (value == "") {
        setResumeErrorState(true);
      } else {
        setResumeErrorState(false);
      }
      setResume(value);
    } else {
      var errorStateTemp = errorState;
      if (value === null) {
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

  const submitEdit = () => {
    setLoading(true);
    var data = {
      application_id: application_id,
      student_id: student_id,
      opening_id: reqJobPosting.id,
      resume_file_name: resume,
      additional_info: additionalTextInfo,
    };
    // check null values in additional info
    for (var key in additionalTextInfo) {
      if (additionalTextInfo[key] === "") {
        setErrorState((prevValue) => {
          return {
            ...prevValue,
            [key]: true,
          };
        });
        setError("Please fill all the fields");
        setLoading(false);
        return;
      }
    }
    editApplication(token = token, data = data).then((res) => {
    setSuccess(true);
    setLoading(false);
  }).catch((err) => {
    console.log(err);
    setError("Something went wrong");
    setLoading(false);
  })
  }

  const toProperCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };


  return (
    <div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#dbdbdb" }}>
          <Modal.Title>
            <b style={{color: "white"}}>
            {
              success ? "Successfully Edited Application" : <> {
                loading ? "Loading..." : "Add Student"
              } </>
            }
              </b>
          </Modal.Title>
        </Modal.Header>
      { !success && !loading && <>
        <Modal.Body style={{ backgroundColor: "#dbdbdb" }}>
          <Form>
            {reqJobPosting && reqJobPosting?.additional_info.length !== 0 && ( <>
              <div className="card-div">
                <h4 align="center" className="modale-info-name"> Student details </h4>
                <div className="modal-field-parent">
                  <Container>
                    <Row>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-key">Student Name:</div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-value">{student_name}</div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="modal-field-parent">
                  <Container>
                    <Row>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-key">Student Batch:</div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-value">{student_batch}</div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="modal-field-parent">
                  <Container>
                    <Row>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-key">Student Branch:</div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-value">{student_branch}</div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
              {reqJobPosting?.additional_info.map((label, i) => {
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
                )
              }
              )
            }
            </>)
          }
            {reqJobPosting &&  resume_file_names ? (
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
                  {resume_file_names.map((resume, i) => {
                    return (
                      <option value={resume.name} key={i}>
                        {resume.name.substring(16)}
                      </option>
                    );
                  })}
                </NativeSelect>
              </div>
            ) : (
              <></>
            )}
            <br />
          </Form>
          <Alert variant="danger" show={error}>
            {error}
          </Alert>
        </Modal.Body>
        </>}
        {loading && <Modal.Body style={{ backgroundColor: "#dbdbdb" }}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
          </div>
        </Modal.Body>}
        <Modal.Footer style={{ backgroundColor: "#dbdbdb" }}>
          {!success &&  <Button onClick={submitEdit} className='btn-submit'>
            Edit application
          </Button>}  
        {success && <Button onClick={handleClose} className='btn-submit'>
            CLOSE
          </Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditStudent;
