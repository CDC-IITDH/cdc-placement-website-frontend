import {useState} from "react";
import useStyles from "./styles";
import {Box, Typography} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import AddStudent from "./AddStudent";
import Swal from 'sweetalert2'
import {MarkStatus} from '../../api/details_page';

const StudentCard = ({ name, branch, batch, roll_no, student_id,opening_id, resume_list, additional_info, token, reqJobPosting, application_id, resume, setError,setShowError,setSuccess, setShowSuccess,selected,
                         setShowLoader, getApplicationsInfo }) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const student_details = {
    "name": name,
    "branch": branch,
    "batch": batch,
    "resume_list": resume_list,
  };
  const application_info = {
    "additional_info": additional_info,
    "resume": resume,
    "id": application_id,
  };
   const markStudentStatus = (status) => {
        if (opening_id && status !== null) {
            Swal.fire({
                title: 'Do you want to update the status to ' + status + ' ?',
                showCancelButton: true,
                confirmButtonText: 'Update',
                denyButtonText: `Cancel`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    MarkStatus(token, opening_id, student_id, status)
                        .then((res) => {
                            if (status) {
                                setSuccess('Student marked as selected');
                            } else {
                                setSuccess('Student marked as not selected')
                            }
                            setShowSuccess(true);
                            getApplicationsInfo();
                            setShowLoader(false);

                        })
                        .catch((err) => {
                            setError('Something went wrong. Please try again after sometime');
                            setShowError(true);
                            setShowLoader(false);
                        });
                    setShowLoader(true);
                }
            })

        } else {
            setError('Error!, Invalid Opening. Please reload.');
            setShowError(true);
        }
    };

    const student_details = {
        "name": name,
        "branch": branch,
        "batch": batch,
        "resume_list": resume_list,
    };
    const application_info = {
        "additional_info": additional_info,
        "resume": resume,
        "id": application_id,
    };

    const application_details = {
        "student_details": student_details,
        "application_info": application_info,
    };

    const hanldeModal = () => {
        setShow(true);
    };

    return (
        <Box
            sx={{
                bgcolor: selected === null ? '#E5E1E1' : (selected === true ? ('#9be1a6') : ('#f19a9a')),
                boxShadow: 1,
                borderRadius: 20,
                height: "150px",
                p: 1,
                margin: "0.25rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBlock: "0.5rem",
                paddingInline: "0.5rem",
            }}
        >
            <AddStudent
                show={show}
                setShow={setShow}
                reqJobPosting={reqJobPosting}
                token={token}
                student_name={name}
                student_batch={batch}
                student_branch={branch}
                student_id={student_id}
                resume_file_names={resume_list}
                application_id={application_id}
                additional_info={additional_info}
                setError={setError}
                setShowError={setShowError}
                setSuccess={setSuccess}
                setShowSuccess={setShowSuccess}
                id={student_id}
                application_details={application_details}
                getApplicationsInfo={getApplicationsInfo}
            />
            <Box
                sx={{
                    marginBlock: "0.5rem",
                    marginInline: "0.5rem",
                }}
            >
                <Typography className={classes.studentCardText}>
                    Name : {name}
                </Typography>
                <Typography className={classes.studentCardText}>
                    Batch : {batch}
                </Typography>
                <Typography className={classes.studentCardText}>
                    Branch : {branch}
                </Typography>
            </Box>
            <Box
                sx={{
                    paddingInline: "0.5rem",
                    paddingBlock: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {selected === null || selected == false ?
                <Box
                    sx={{
                        borderRadius: "50%",
                        color: "white",
                        backgroundColor: "#FF7C86",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "2rem",
                        width: "2rem",
                    }}
                >
                    <ClearIcon  onClick={() => {
                markStudentStatus(false);
              }} />
                </Box> : ""
                }

                <Box
                    sx={{
                        borderRadius: "50%",
                        color: "white",
                        backgroundColor: "#00C3BC",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "2rem",
                        width: "2rem",
                    }}
                >
                    <EditIcon
                        onClick={hanldeModal}
                    />
                </Box>
                {selected === null || selected === false ?
                    <Box
                        sx={{
                            borderRadius: "50%",
                            color: "white",
                            backgroundColor: "#66C971",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "2rem",
                            width: "2rem",
                        }}
                    >
                        <CheckIcon onClick={() => {
                markStudentStatus(true);
              }} />
                    </Box>
                    :
                    ""
                }

            </Box>

        </Box>

    );
};

export default StudentCard;
