import { useState, useEffect } from "react";
import "./AddStudent.css";
import { Modal, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import NativeSelect from "@material-ui/core/NativeSelect";
import { CircularProgress } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import getApplication from "../../api/getApplication";
import editApplication from "../../api/editApplication";


const AddStudent = ({ show, setShow, reqJobPosting, token, setError, setShowError, setSuccess, setShowSuccess, id, application_details, getApplicationsInfo  }) => {
  let initalResume = application_details ? application_details.application_info.resume.name : "";
  let initialAdditionalInfo = application_details ? JSON.parse(application_details.application_info.additional_info) : {};
  let initialEditoradd = id ? "Edit" : "";

  
  const [student_id, setStudentId] = useState("");
  const [getApplicationResponse, setGetApplicationResponse] = useState(application_details);
  const [searchedId, setSearchedId] = useState(id);
  const [resume, setResume] = useState(initalResume);
  const [editoradd, setEditoradd] = useState(initialEditoradd);
  const [additionalTextInfo, updateAdditionalTextInfo] = useState(initialAdditionalInfo);

  useEffect(() => {
    initalResume = application_details ? application_details.application_info.resume.name : "";
    initialAdditionalInfo = application_details ? JSON.parse(application_details.application_info.additional_info) : {};
    initialEditoradd = id ? "Edit" : "";
    setGetApplicationResponse(application_details);
    updateAdditionalTextInfo(initialAdditionalInfo);
    setResume(initalResume);
    setEditoradd(initialEditoradd);
    setSearchedId(id);
  }, [application_details]);

  const [student_id_error, setStudentIdError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeErrorState, setResumeErrorState] = useState(false);
  const [errorState, setErrorState] = useState({});



  const handleClose = () =>{
    setShow(false);
    setSearchedId(id);
    updateAdditionalTextInfo(initialAdditionalInfo);
    setStudentId("");
    setErrorState({});
    setStudentIdError(false);
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
      setStudentIdError(true);
      setError("Student ID cannot be empty");
      setShowError(true);
      setLoading(false);
      return;
    }
    setError(null);
    getApplication(token = token, data = data).then((res) => {
      if (res.student_details.resume_list.length === 0) {
        setError("No resume found for student");
        setShowError(true);
        setLoading(false);
        return;
      }
      setGetApplicationResponse(res);
      if(res.application_info.additional_info){ 
      updateAdditionalTextInfo(JSON.parse(res.application_info.additional_info));
      }
      if(res.application_found === "true"){
        setEditoradd("Edit");
        setResume(res.application_info.resume.name);
      } else {
        setEditoradd("Add");
        setResume(res.student_details.resume_list[0].name);
      }
      setSearchedId(student_id);
      setLoading(false);
      }
  ).catch((err) => {
    if (err.message === "400") {
      setError("Student ID not found");
    } else {
      // setError("Something went wrong");
      setError(err.message);
    }
    setShowError(true);
    setLoading(false);
  })
  };

  const submitEdit = () => {
    setLoading(true);
    let app_id = getApplicationResponse.application_info.id? getApplicationResponse.application_info.id : "";
    if(id){
      app_id = application_details.application_info.id;
    }
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
        setShowError(true);
        setLoading(false);
        return;
      }
    }


    editApplication(token = token, data = data).then((res) => {
      setSuccess("Application "+editoradd+" successfully");
      setShowSuccess(true);
      setLoading(false);
      getApplicationsInfo();
      handleClose();
  }).catch((err) => {
    console.log(err);
    setError("Something went wrong");
    setShowError(true);
    setLoading(false)
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
                loading ? "Loading..." : "Add/Edit Student"
            }
              </b>
          </Modal.Title>
        </Modal.Header>
      { !loading && <>
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
                        <div className="modale-field-value">{getApplicationResponse.student_details.name}</div>
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
                        <div className="modale-field-value">{getApplicationResponse.student_details.batch}</div>
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
                        <div className="modale-field-value">{getApplicationResponse.student_details.branch}</div>
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
            {reqJobPosting && searchedId && getApplicationResponse.student_details.resume_list ? (
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
                  {getApplicationResponse.student_details.resume_list.map((resume, i) => {
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
        </Modal.Body>
        </>}
        {loading && <Modal.Body style={{ backgroundColor: "#dbdbdb" }}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
          </div>
        </Modal.Body>}
        <Modal.Footer style={{ backgroundColor: "#dbdbdb" }}>
         { !searchedId && !loading && <Button onClick={idSubmit} className='btn-submit'>
            ADD STUDENT
          </Button>}
          {!loading && searchedId &&  <Button onClick={submitEdit} className='btn-submit'>
            {editoradd} application
          </Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudent;
