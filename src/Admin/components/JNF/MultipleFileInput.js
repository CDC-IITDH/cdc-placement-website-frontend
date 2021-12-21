import React,{useRef, useEffect} from 'react'
import { Form } from 'react-bootstrap';
import {Chip} from "@material-ui/core";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MultipleFileInput = ({ stateVar, setStateVar, name, label }) => {
  const [fileExceptions, setFileExceptions] = React.useState([])
  const [sizeExceptions, setSizeExceptions] = React.useState([])
  const fileInput = useRef()
  // make it invisible
  // fileInput.current.style.display = 'none'
  useEffect(() => {
    if (fileInput){

      fileInput.current.style.display = 'none'
    }
  }, [fileInput])
  function addFile (file, stateVar, setStateVar) {
    let localStateVar = stateVar
    let localfileExceptions = []
    let localsizeExceptions = []
    console.log(file)
    for (let i = 0; i < file.length; i++) {
      // file type should be an PDF
      if (file[i].type === 'application/pdf' && file[i].size < 104857600 ) {
        localStateVar.push(file[i])
      } else {
        if (file[i].type !== 'application/pdf') {
          localfileExceptions.push(file[i].name)
        }
        if (file[i].size > 104857600) {
          localsizeExceptions.push(file[i].name)
        }
      }
    }
    setStateVar([...localStateVar])
    setFileExceptions(localfileExceptions)
    setSizeExceptions(localsizeExceptions)
    if (fileExceptions.length > 0) {
      alert(`${localfileExceptions.join(', ')} is not a PDF file.`)
    }
    if (sizeExceptions.length > 0) {
      alert(`${localsizeExceptions.join(', ')} is too large.`)
    }
  }

  return (
    <>
  <Form.Group className="mb-5">
    <Form.Label>{label}</Form.Label>
    <br />
    {stateVar.map((item,index) => (
      <Chip key={item.name} label={item.name} onDelete={() => {
        setStateVar(stateVar.filter((_, i) => i !== index))
        }}
      />
    ))}
    <p className="select-feedback"></p>
    <Form.Control ref={fileInput} type="file" name={name} multiple={true} accept="application/pdf" onChange={(event) => {addFile(event.currentTarget.files,stateVar,setStateVar)}} />
    <Button variant="contained" color="primary" onClick={() => {fileInput.current.click()}}>Upload</Button><br />
    <Form.Text className="text-muted">
      PDF (Max. 10MB)
    </Form.Text>
  </Form.Group>
  <Dialog open={fileExceptions.length > 0 || sizeExceptions.length > 0 } onClose={()=>{setFileExceptions([]);setSizeExceptions([])}} >
  <DialogTitle>File Exceptions</DialogTitle>
  <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {fileExceptions.length > 0 ? `${fileExceptions.join(', ')} is not a PDF file.` : ''}
            {sizeExceptions.length > 0 ? `${sizeExceptions.join(', ')} is too large.` : ''}
          </DialogContentText>
        </DialogContent>
  <DialogActions>
          <Button onClick={()=>{setFileExceptions([]);setSizeExceptions([])}} autoFocus>
            Ok
          </Button>
        </DialogActions>
  </Dialog>
  </>
  )
}


export default MultipleFileInput;
