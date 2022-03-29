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

  const [filenumberExceptions, setFilenumberExceptions] = React.useState(false)

  function addFile (files, stateVar, setStateVar) {
    let localStateVar = stateVar
    let localfileExceptions = []
    let localsizeExceptions = []
    for (let i = 0; i < files.length; i++) {
      // file type should be an PDF
      if (files[i].type === 'application/pdf' && files[i].size < 104857600 ) {
        if (localStateVar.length < 3) {
          localStateVar.push(files[i])
        } else {
          setFilenumberExceptions(true)
          break
        }
      } else {
        if (files[i].type !== 'application/pdf') {
          localfileExceptions.push(files[i].name)
        }
        if (files[i].size > 104857600) {
          localsizeExceptions.push(files[i].name)
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
        <div>
          {stateVar.map((item,index) => (
            <Chip className='m-1' key={item.name} label={item.name} onDelete={() => {
              setStateVar(stateVar.filter((_, i) => i !== index))
              }}
            />
          ))}
        </div>
        <div className='mt-2 bg-white rounded upload-zone text-center p-2 border border-secondary position-relative' style={{color:'#b3bccd'}} >
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
            <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
          </svg>
          <p className='text-dark'><b>Upload Files</b><br />
          <span className="text-muted">Click here to select or drag and drop files here</span></p>

          <Form.Control className='position-absolute top-50 start-50 translate-middle h-100' style={{opacity: 0}} type="file" multiple={true} accept="application/pdf" onChange={(event) => {addFile(event.currentTarget.files,stateVar,setStateVar)}} title="" />
        </div>
        <Form.Text className="text-muted">
          PDF (Max. 10MB)
        </Form.Text>
      </Form.Group>
      <Dialog open={fileExceptions.length > 0 || sizeExceptions.length > 0 } onClose={()=>{setFileExceptions([]);setSizeExceptions([])}} >
      <DialogTitle>File Exceptions</DialogTitle>
      <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {fileExceptions.length > 0 ? `${fileExceptions.join(', ')} ${fileExceptions.length>1?'are':'is'} not ${fileExceptions.length>1?'':'a'} PDF file.` : ''}
                {sizeExceptions.length > 0 ? `${sizeExceptions.join(', ')} ${fileExceptions.length>1?'are':'is'} too large.` : ''}
              </DialogContentText>
            </DialogContent>
      <DialogActions>
              <Button onClick={()=>{setFileExceptions([]);setSizeExceptions([])}} autoFocus>
                Ok
              </Button>
            </DialogActions>
      </Dialog>

      <Dialog open={filenumberExceptions} onClose={()=>{setFilenumberExceptions(false)}} >
      <DialogTitle>File Exceptions</DialogTitle>
      <DialogContent>
              
              <DialogContentText id="alert-dialog-description">
                You can only upload 3 files.
              </DialogContentText>
            </DialogContent>
      <DialogActions>
              
              <Button onClick={()=>{setFilenumberExceptions(false)}} autoFocus>
                Ok
              </Button>
            </DialogActions>
      </Dialog>
    </>
  )
}


export default MultipleFileInput;
