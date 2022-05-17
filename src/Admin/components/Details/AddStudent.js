import { useState, useEffect } from "react";
import "./AddStudent.css";
import { Modal, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import NativeSelect from "@material-ui/core/NativeSelect";
import { CircularProgress } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import getApplication from "../../api/getApplication";
import editApplication from "../../api/editApplication";


const AddStudent = ({ show, setShow, reqJobPosting, token }) => {
  const [student_id, setStudentId] = useState("");
  const [getApplicationResponse, setGetApplicationResponse] = useState(null);
  const [searchedId, setSearchedId] = useState(null);
  const [resume, setResume] = useState("");
  const [editoradd, setEditoradd] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [student_id_error, setStudentIdError] = useState(false);
  

  const [resumeErrorState, setResumeErrorState] = useState(false);
  const [errorState, setErrorState] = useState({});
  const [additionalTextInfo, updateAdditionalTextInfo] = useState({});

  const handleClose = () =>{
    setShow(false);
    setSearchedId(null);
    updateAdditionalTextInfo({});
    setSuccess(false);
    setStudentId("");
    setError(null);
    setErrorState({});
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "Student ID"){
      if (value !== ""){
        setStudentIdError(false);
        setStudentId(value);
      } else {
        setStudentIdError(true);
        setStudentId("");
      }
    }
    else{
    if (name === "resume") {
      console.log(value, "Resume state");
      if (value == null) {
        setResumeErrorState(true);
      } else {
        setResumeErrorState(false);
      }
      setResume(value);
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
  }

  const idSubmit = () => {
    setLoading(true);
    var data = {
      student_id: student_id,
      opening_id: reqJobPosting.id,
    };
    if (student_id === "") {
      setError("Student ID cannot be empty");
      setLoading(false);
      return;
    }
    setError(null);
    getApplication(token = token, data = data).then((res) => {
      if (res.available_resumes.length === 0) {
        setError("No resume found for student");
        setLoading(false);
        return;
      }
      setGetApplicationResponse(res);
      if(res.application_additionalInfo){ 
      updateAdditionalTextInfo(JSON.parse(res.application_additionalInfo));
      }
      if(res.found==="true"){
        setEditoradd("Edit");
      } else {
        setEditoradd("Add");
      }
      setResume(res.available_resumes[0]);
      setSearchedId(student_id);
      setLoading(false);
      }
  ).catch((err) => {
    console.log(err.message);
    if (err.message === "400") {
      setError("Student ID not found");
    } else {
      setError("Something went wrong");
    }
    setLoading(false);
  })
  };

  const submitEdit = () => {
    setLoading(true);
    let app_id = getApplicationResponse.application_id? getApplicationResponse.application_id : "";
    var data = {
      application_id: app_id,
      student_id: searchedId,
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
              success ? "Successfully "+ editoradd +"ed Application" : <> {
                loading ? "Loading..." : "Add Student"
              } </>
            }
              </b>
          </Modal.Title>
        </Modal.Header>
      { !success && !loading && <>
        <Modal.Body style={{ backgroundColor: "#dbdbdb" }}>
          <Form>
            
            {searchedId ? (
              <></>
            ) : (
              <div className="Parent">
                <h2 className="label">Student ID</h2>
                <h2 className="label colon">{":"}</h2>
                <TextField
                  label={"Student ID"}
                  name={"Student ID"}
                  variant="outlined"
                  onChange={handleInputChange}
                  error={student_id_error}
                  required
                />
                </div>
            )}


            {reqJobPosting && searchedId && reqJobPosting?.additional_info.length !== 0 && ( <>
              <div className="card-div">
                <h4 align="center" className="modale-info-name"> Student details </h4>
                <div className="modal-field-parent">
                  <Container>
                    <Row>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-key">Student Name:</div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <div className="modale-field-value">{getApplicationResponse.student_name}</div>
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
                        <div className="modale-field-value">{getApplicationResponse.student_batch}</div>
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
                        <div className="modale-field-value">{getApplicationResponse.student_branch}</div>
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
            {reqJobPosting && searchedId && getApplicationResponse.available_resumes ? (
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
                  {getApplicationResponse.available_resumes.map((resume, i) => {
                    return (
                      <option value={resume} key={i}>
                        {resume.substring(16)}
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
         { !searchedId && !success && !loading && <Button onClick={idSubmit} className='btn-submit'>
            ADD STUDENT
          </Button>}
          {searchedId && !success &&  <Button onClick={submitEdit} className='btn-submit'>
            {editoradd} application
          </Button>}  
        {success && <Button onClick={handleClose} className='btn-submit'>
            CLOSE
          </Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudent;
