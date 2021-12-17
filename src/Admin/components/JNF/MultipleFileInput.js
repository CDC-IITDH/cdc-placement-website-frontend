import React from 'react'
import { Form } from 'react-bootstrap';
import {Chip} from "@material-ui/core";

const MultipleFileInput = ({ stateVar, setStateVar, name }) => {
  console.log(stateVar)
  const addFile = (file, stateVar, setStateVar) => {
    let localStateVar = stateVar
    localStateVar.push(...file)
    setStateVar(localStateVar)
  }

  return (
  <Form.Group className="mb-5">
    <Form.Label>Brief About the Company</Form.Label>
    {stateVar.map((item, index) => {
      return (
        <Chip key={item.name} label={item.name} onDelete={() => {
          setStateVar(stateVar.filter((_, i) => i !== index))
          }}
        />
      )
    })}
    <p className="select-feedback"></p>
    <Form.Control type="file" name={name} multiple={true} accept="application/pdf" onChange={(event) => {addFile(event.currentTarget.files,stateVar,setStateVar)}} />
    <Form.Text className="text-muted">
      PDF (Max. 10MB)
    </Form.Text>
  </Form.Group>
  )
}

export default MultipleFileInput;
