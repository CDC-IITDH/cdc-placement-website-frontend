import React, { useState } from "react";
import "./AddStudent.css";
import { Modal, Button, Form } from "react-bootstrap";
import DropBox from "./DropBox";
import { Typography } from "@material-ui/core";
import { AddStudentApplication, GetApplications } from "../../api/details_page";

const AddStudent = ({
  show,
  setShow,
  reqJobPosting,
  token,
  openingId,
  setShowLoader,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  setapplicationsInfo,
  setselectedStudents,
}) => {
  const [rollno, setrollno] = useState("");
  const [formDetailsFilled, setformDetailsFilled] = useState({});
  const [resume, setresume] = useState(null);

  const getApplicationsInfo = () => {
    if (token) {
      GetApplications(token, openingId)
        .then((res) => {
          const data = res;
          setapplicationsInfo(data);
          setselectedStudents(
            data?.applications?.filter((elem) => elem.selected === true).length
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = () => {
    setrollno("");
    setformDetailsFilled({});
    setresume(null);
    setShow(false);
  };

  const handleSubmit = async () => {
    if (rollno && formDetailsFilled && resume) {
      if (rollno === "") {
        setError("Roll no was not filled");
        setShowError(true);
        return;
      }

      if (reqJobPosting && reqJobPosting?.additional_info.length !== 0) {
        let check = false;
        check = reqJobPosting?.additional_info.some((elem) => {
          return (
            formDetailsFilled.hasOwnProperty(elem) === false ||
            formDetailsFilled.elem === ""
          );
        });
        if (check) {
          setError("Some additional fields are blank!");
          setShowError(true);
          return;
        }
      }

      const data = {
        opening_type: "Placement",
        opening_id: openingId,
        resume_file_name: resume?.name,
        additional_info: {
          ...formDetailsFilled,
        },
        student_id: rollno,
      };

      var result = await AddStudentApplication(token, data);
      if (result.message === "Application Submitted") {
        setSuccess("New student has been added");
        setShowSuccess(true);
        handleClose(true);
        getApplicationsInfo();
      } else {
        setError("There was some error in adding the student");
        setShowError(true);
      }
    } else {
      setError("Something was not filled");
      setShowError(true);
    }
  };

  const changeField = (e) => {
    if (e.target.id === "rollno") {
      setrollno(e.target.value);
    } else {
      setformDetailsFilled({
        ...formDetailsFilled,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#dbdbdb" }}>
          <Modal.Title>
            <b style={{ color: "white" }}>Add Student :</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#dbdbdb" }}>
          <Form>
            <Form.Group
              onChange={changeField}
              className='form-fields'
              controlId='rollno'
            >
              <Form.Label>IITDH Roll no:</Form.Label>
              <Form.Control type='text' />
            </Form.Group>
            <br />
            <p>Fill the additional fields:</p>
            {reqJobPosting && reqJobPosting?.additional_info.length !== 0 ? (
              reqJobPosting?.additional_info.map((elem, index) => {
                return (
                  <Form.Group
                    onChange={changeField}
                    key={index}
                    className='form-fields'
                    controlId={elem}
                  >
                    <Form.Label>{elem}</Form.Label>
                    <Form.Control type='text' />
                  </Form.Group>
                );
              })
            ) : (
              <Typography
                style={{
                  textAlign: "center",
                }}
              >
                No additional info required
              </Typography>
            )}
            <br />
            <Form.Group className='mb-3' controlId='resume'>
              <Form.Label>Upload your Resume</Form.Label>
              <DropBox setresume={setresume} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#dbdbdb" }}>
          <Button onClick={handleSubmit} className='btn-submit'>
            ADD STUDENT
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudent;
