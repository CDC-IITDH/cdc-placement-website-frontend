import React, {Fragment, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import TextField from "@material-ui/core/TextField";
import './AddPPOModal.css';
import NativeSelect from "@material-ui/core/NativeSelect";
import addPPO from "./../../api/addPPO";
const AddPPOModal = ({
    token,
                         showModal,
                         setShowModal,
                         ModalType,
                         setModalType,
                         setShowLoader,
                         setError,
                         setShowError,
                         setSuccess,
                         setShowSuccess,
                     }
) => {

    const [errorState, setErrorState] = useState({
        student_id: false,
        company_name: false,
        designation: false,
        compensation_gross: false,
        accepted: false,
        tier: false,
    });
    const [isError, setIsError] = useState(false);
    // find if at least one in true in errorState
    const checkError = () => {
        let check = false;
        for (let key in errorState) {
            if (errorState[key]) {
                check = true;
                break;
            }
        }
        return check;
    };
    const [data, setData] = useState({
        student_id: '',
        company_name: '',
        designation: '',
        compensation_gross: '',
        compensation_details: '',
        offer_accepted: '',
        tier:1,
    });
    const handleClose = () => {
        setShowModal(false);
        setErrorState({
            student_id: false,
            company_name: false,
            designation: false,
            compensation_gross: false,
            offer_accepted: false,
            tier: false,
        });
        setModalType('');
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
    if(name !== 'compensation_details'){
         if (value.length > 0 ) {
            setErrorState({
                ...errorState,
                [name]: false,
            });
        }else{
            setErrorState({
                ...errorState,
                [name]: true,
            });
        }
        setIsError(checkError());
    }

        setData({
            ...data,
            [name]: value,
        });



    };

    const SendData = () => {

        setShowLoader(true);
        var temp_error = {...errorState};
         var error = Object.keys(errorState).map((elem) => {
             if (elem === 'compensation_details'){
                 return false;
             }
             if (data.hasOwnProperty(elem)){
                 if(data[elem].length === 0){
                     temp_error[elem] = true;
                     return true;
                 }else{
                     temp_error[elem] = false;

                     return false;
                 }
             }
         })
         setErrorState(temp_error);

        if(error.includes(true)){
            setShowError(true);
            setError('Please fill all the fields');
            setShowLoader(false);
            return;
        }

       addPPO(token, data)
            .then(res => {
                    setShowSuccess(true);
                    setSuccess("Pre Placement Offer added successfully");
                    setShowLoader(false);
                    setShowModal(false);
                    setModalType('');

            })
            .catch(err => {
                setShowError(true);
                setError('Unable to add Offer, Something went wrong');
                setShowLoader(false);

            });
    };
    return (
        <Fragment>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="modale-title">
                        Add Pre Placement Offer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-div-addPPO">
                        <Container>
                            <div className="Parent-addPPO">
                                <h2 className="label-addPPO">Student Roll No.:</h2>
                                <TextField
                                    className="addPPO-textField"
                                    id='student_id'
                                    name="student_id"
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    value={data['student_id']}
                                    error={errorState['student_id']}
                                    size={'small'}
                                    placeholder={'Enter Student Roll No.'}
                                    required
                                />
                            </div>
                            <div className="Parent-addPPO">
                                <h2 className="label-addPPO">Company Name:</h2>
                                <TextField
                                    className="addPPO-textField"
                                    id='company_name'
                                    name="company_name"
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    value={data['company_name']}
                                    error={errorState['company_name']}
                                    size={'small'}
                                    placeholder={'Enter Company Name'}
                                    required
                                />
                            </div>
                            <div className="Parent-addPPO">
                                <h2 className="label-addPPO">Designation:</h2>
                                <TextField
                                    className="addPPO-textField"
                                    id='designation'
                                    name="designation"
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    value={data['designation']}
                                    error={errorState['designation']}
                                    size={'small'}
                                    placeholder={'Enter Designation'}
                                    required
                                />
                            </div>
                            <div className="Parent-addPPO">
                                <h2 className="label-addPPO">Compensation (Gross):</h2>
                                <TextField
                                    className="addPPO-textField"
                                    id='compensation_gross'
                                    name="compensation_gross"
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    value={data['compensation_gross']}
                                    error={errorState['compensation_gross']}
                                    size={'small'}
                                    placeholder={'Enter Compensation (Gross)'}
                                    required
                                />
                            </div>
                            <div className="Parent-addPPO">
                                <h2 className="label-addPPO">Compensation Details:</h2>
                                <TextField
                                    className="addPPO-textField"
                                    id='compensation_details'
                                    name="compensation_details"
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    value={data['compensation_details']}
                                    size={'small'}
                                    placeholder={'Enter Compensation Details'}
                                />
                            </div>
                            <div className="Parent-addPPO">
                                <h2 className="label-addPPO">Tier:</h2>
                                <NativeSelect
                                    className="addPPO-textField"
                                    onChange={handleInputChange}
                                    value={data['tier']}
                                    name="tier"
                                    error={errorState['tier']}
                                    inputProps={{
                                        name: "tier",
                                        id: "tier-selector",
                                    }}
                                >
                                     <option value={1} >
                                        1
                                    </option>
                                    <option value={2} >
                                        2
                                    </option>
                                    <option value={3} >
                                        3
                                    </option>
                                    <option value={4} >
                                        4
                                    </option>
                                    <option value={5} >
                                        5
                                    </option>
                                    <option value={6} >
                                        6
                                    </option>
                                    <option value={7} >
                                        7
                                    </option>
                                </NativeSelect>
                            </div>
                            <div className="Parent-addPPO">
                                <h2 className="label-addPPO">Accepted:</h2>
                                <NativeSelect
                                    className="addPPO-textField"
                                    onChange={handleInputChange}
                                    value={data['offer_accepted']}
                                    name="offer_accepted"
                                    error={errorState['offer_accepted']}
                                    inputProps={{
                                        name: "offer_accepted",
                                        id: "offer_accepted-selector",
                                    }}
                                >
                                     <option value={null} >
                                        Null
                                    </option>
                                    <option value={true} >
                                        True
                                    </option>
                                    <option value={false} >
                                        False
                                    </option>
                                </NativeSelect>
                            </div>


                        </Container>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={SendData}

                    >
                        Submit
                    </Button>


                </Modal.Footer>
            </Modal>
        </Fragment>
    );

}

export default AddPPOModal;