import React from "react";
import "./AddStudent.css";
import {Modal, Button, Form} from "react-bootstrap";
import DropBox from "./DropBox";
import {Typography} from "@material-ui/core";

function addStudent({show, setShow, reqJobPosting}) {
    const handleClose = () => setShow(false);
    return (
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header style={{backgroundColor: "#dbdbdb"}}>
                    <Modal.Title>
                        <b style={{color: "white"}}>Add Student :</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "#dbdbdb"}}>
                    <p>Fill the additional fields</p>
                    <Form>

                        {reqJobPosting && reqJobPosting?.additional_info.length !== 0 ? (
                            reqJobPosting?.additional_info.map((elem) => {
                                return (
                                    <Form.Group className='form-fields' controlId='formSchool'>
                                        <Form.Label>{elem}</Form.Label>
                                        <Form.Control type='text'/>
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
                        <br/>
                        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Label>Upload your Resume</Form.Label>
                            <DropBox/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor: "#dbdbdb"}}>
                    <Button onClick={handleClose} className='btn-submit'>
                        ADD STUDENT
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default addStudent;
