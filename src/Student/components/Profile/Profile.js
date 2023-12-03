import React, {useEffect, useState} from "react";
import "./Profile.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteIcon from "@material-ui/icons/Delete";
import Drag from "./DragandDrop";
import {addResume, deleteResume} from "../../api/profile";


const Profile = ({
                     profileInfo,
                     getProfileInfo,
                     token,
                     setShowLoader,
                     setShowProfile,
                     setError,
                     setShowError,
                     setSuccess,
                     setShowSuccess
                 }) => {
    var [show, setShow] = useState(true);
    var [screen, setScreen] = useState(1);
    var [screen_message, setScreenMessage] = useState("");
    const APPLICATION_ENDPOINT = process.env.REACT_APP_STUDENT_APPLICATIONS_ENDPOINT;

    useEffect(() => {
        if (profileInfo) {
            setShowLoader(false);
        }
    }, [profileInfo, setShowLoader]);

    if (profileInfo && show) {
        const OpenResume = (resume_name) => {

            window.open(
                resume_name
            );
        };

        const DeleteResume = async (resume) => {
            setScreenMessage("Deleting Resume...");
            setScreen(3);
            var data = await deleteResume(token, resume);

            if (data) {
                setScreen(1);
                getProfileInfo();
                setShowSuccess(true);
                setSuccess("Resume Deleted Successfully");
            } else {
                setShow(false);
            }
        };

        const AddResume = async (file) => {
            if (file) {
                setScreenMessage("Adding Resume...");
                setScreen(3);
                var data = await addResume(token, file);
                if (data) {
                    setScreen(1);
                    setShowSuccess(true);
                    setSuccess("Resume Added Successfully");
                    getProfileInfo();
                } else {
                    setShowError(true);
                    setError("Unable to Add Resume");
                    setScreen(1);
                }
            } else {
                setShowError(true);
                setError("Upload File To Submit");
            }
        };

        const handleClose = (resume) => {
            setShowProfile(false);
        };

        if (screen === 1)
            return (
                <div>

                    <Modal
                        show={show}
                        animation={true}
                        size="lg"
                        centered
                        backdrop={true}
                        onHide={handleClose}
                    >
                        <Modal.Header className="modal-header">
                            <Modal.Title className="modal-header-content">
                                Profile
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                            <Container>
                                <Row>
                                    <Col md={12} lg={6} className="modal-col-details">
                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">Name:</div>
                                            <div className="modal-field-value">
                                                {profileInfo.name}
                                            </div>
                                        </div>
                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">Roll No:</div>
                                            <div className="modal-field-value">
                                                {profileInfo.roll_no}
                                            </div>
                                        </div>
                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">Batch:</div>
                                            <div className="modal-field-value">
                                                {profileInfo.batch}
                                            </div>
                                        </div>

                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">Branch:</div>
                                            <div className="modal-field-value">
                                                {profileInfo.branch}
                                            </div>
                                        </div>
                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">Phone Number:</div>
                                            <div className="modal-field-value">
                                                {profileInfo.phone_number}
                                            </div>
                                        </div>
                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">CPI:</div>
                                            <div className="modal-field-value">{profileInfo.cpi}</div>
                                        </div>
                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">Registered for Placements:</div>
                                            <div className="modal-field-value">{profileInfo.can_apply?"True":"False"}</div>
                                        </div>
                                        <div className="modal-field-parent">
                                            <div className="modal-field-key">Registered for Internships:</div>
                                            <div className="modal-field-value">{profileInfo.can_apply_internship?"True":"False"}</div>
                                        </div>

                                        {
                                            profileInfo.offers && profileInfo.offers.length ?
                                                <div className="modal-field-key" style={{marginTop: "15px"}}>
                                                    Current Offers:
                                                </div> : ""
                                        }
                                        {
                                            profileInfo.offers.map((offer, index) => {
                                                return (
                                                    <div className="modal-field-parent">
                                                        <div className="modal-field-key">Offer {index + 1} at</div>
                                                        <div className="modal-field-value">
                                                            {offer.placement_offer_type === 'PPO' ?
                                                                <span>{offer.company_name} (PPO)</span>
                                                                :
                                                                <a href={APPLICATION_ENDPOINT + offer.application_id}>{offer.company_name}</a>

                                                            }

                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }


                                    </Col>
                                    <Col md={12} lg={6}>
                                        <div className="modal-field-key">Resumes</div>
                                        <div className="modal-col-resumes">
                                            {profileInfo.resume_list.map((resume, i) => {
                                                return (
                                                    <div className="modal-resume-pill" key={i}>
                                                        <Container>
                                                            <Row>
                                                                <Col xs={10}>
                                                                    <div
                                                                        onClick={() => {
                                                                            OpenResume(resume.link);
                                                                        }}
                                                                        className="modal-resume-content"
                                                                    >
                                                                        {" "}
                                                                        {resume.name.slice(16)}{" "}
                                                                    </div>
                                                                </Col>
                                                                <Col xs={2}>
                                                                    <DeleteIcon
                                                                        onClick={() => {
                                                                            DeleteResume(resume.name);
                                                                        }}
                                                                        className="modal-resume-delete-icon"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div
                                            className="modal-resume-pill modal-resume-add"
                                            onClick={() => {
                                                setScreen(2);
                                            }}
                                        >
                                            <div className="modal-resume-content modal-resume-add-content">
                                                +
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <div style={{textAlign: "center", width: "100%"}}>
                                <Button onClick={handleClose} className="modal-upload-cancel">
                                    Close
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        else if (screen === 2)
            return (
                <div>
                    <Modal show={show} animation={true} size="lg" centered>
                        <Modal.Header className="modal-header">
                            <Modal.Title className="modal-header-content">
                                Add Resume
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                            <Container>
                                <Drag AddResume={AddResume} setError={setError} setShowError={setShowError}/>
                                <div style={{textAlign: "center"}}>
                                    <Button
                                        onClick={() => {
                                            setScreen(1);
                                        }}
                                        className="modal-upload-cancel"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Container>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        else
            return (
                <div>
                    {" "}
                    <Modal show={show} animation={true} size="mg" centered>
                        <Modal.Header className="modal-header">
                            <Modal.Title className="modal-header-content">
                                {screen_message}
                            </Modal.Title>
                        </Modal.Header>
                    </Modal>
                </div>
            );
    } else if (!profileInfo) {
        return "";
    } else {
        return "";
    }
};

export default Profile;
