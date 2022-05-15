import { useState, useEffect } from "react";
import "./AddStudent.css";
import { Modal, Button, Form } from "react-bootstrap";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import getApplication from "../../api/getApplication";
import editApplication from "../../api/editApplication";


const AddStudent = ({ show, setShow, reqJobPosting, token }) => {
  const [student_id, setStudentId] = useState("");
  const [getApplicationResponse, setGetApplicationResponse] = useState(null);
  const [searchedId, setSearchedId] = useState(null);

  const [resume, setResume] = useState("");
  const [success, setSuccess] = useState(false);

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
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "Student ID"){
      if (value !== ""){
        setStudentIdError(false);
        setStudentId(value);
      } else {
        setStudentIdError(true);
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
    var data = {
      student_id: student_id,
      opening_id: reqJobPosting.id,
    };
    getApplication(token = token, data = data).then((res) => {
      setGetApplicationResponse(res);
      if(res.application_additionalInfo){ 
      updateAdditionalTextInfo(JSON.parse(res.application_additionalInfo));
      }
      setResume(res.available_resumes[0]);
      setSearchedId(student_id);
  }).catch((err) => {
    console.log(err);
  })
  };

  const submitEdit = () => {
    let app_id = getApplicationResponse.id? getApplicationResponse.id : "";
    var data = {
      application_id: app_id,
      student_id: searchedId,
      opening_id: reqJobPosting.id,
      resume_file_name: resume,
      additional_info: additionalTextInfo,
    };

    editApplication(token = token, data = data).then((res) => {
    setSuccess(true);
  }).catch((err) => {
    console.log(token);
    console.log(err);
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
              success ? "Successfully Edited Application" : "Edit Application"
            }
              </b>
          </Modal.Title>
        </Modal.Header>
      { !success && <>
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


            {reqJobPosting && searchedId && reqJobPosting?.additional_info.length !== 0 && (
              reqJobPosting?.additional_info.map((label, i) => {
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
            )
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
        </Modal.Body>
        </>}
        <Modal.Footer style={{ backgroundColor: "#dbdbdb" }}>
         { !searchedId && !success && <Button onClick={idSubmit} className='btn-submit'>
            ADD STUDENT
          </Button>}
          {searchedId && !success &&  <Button onClick={submitEdit} className='btn-submit'>
            EDIT
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
