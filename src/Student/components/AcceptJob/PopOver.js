import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AcceptOffer } from "../../api/dashboard";
//import style
import "./PopOver.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '5px solid #000',
  boxShadow: 24,
  p: 4,
};

function PopOver({
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
  hasChoosen,
  offerStatus,
  setError,
  setShowError,
  setSuccess,
  setShowSuccess,
  setShowLoader,
  getDashboardInfo,
}) {
  const handleAccept = async () => {
    try {
      setShowLoader(true);
      const data = {
        company,
        designation,
        compensation,
        additionalInfo,
        profileInfo,
        type,
        id,
        hasChoosen: true,
        offerStatus: true,
      };
      await AcceptOffer(token, data);
      setSuccess("Offer Accepted Successfully");
      setShowSuccess(true);
      setShowLoader(false);
      getDashboardInfo(); // Call the function to refresh dashboard info after successful acceptance
    } catch (error) {
      setShowLoader(false);
      setError("Error Accepting Offer");
      setShowError(true);
      console.error('Error accepting offer:', error);
    }
  };

  const handleReject = async () => {
    try {
      setShowLoader(true);
      const data = {
        company,
        designation,
        compensation,
        additionalInfo,
        profileInfo,
        type,
        id,
        hasChoosen: true,
        offerStatus: false,
      };
      await AcceptOffer(token, data);
      setSuccess("Offer Denied Successfully");
      setShowSuccess(true);
      setShowLoader(false);
      getDashboardInfo(); // Call the function to refresh dashboard info after successful rejection
    } catch (error) {
      setShowLoader(false);
      setError("Error Rejecting Offer");
      setShowError(true);
      console.error('Error rejecting offer:', error);
    }
  };

  return (
    <div>
      <Button onClick={setShow}></Button>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleAccept}>Accept</Button>
          <Button onClick={handleReject}>Reject</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default PopOver;
