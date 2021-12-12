import { Form, Row, Col, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'

const SelectionProcess = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty, setFieldValue}) => {
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src={banner}></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">
              SELECTION PROCESS
            </div>
          </div>
        </div>
      </Container>
      <p className="mb-3 text-center">
        Describe the selection process for the students.
      </p>
      <hr className="pd" />
      <Form.Group className="mb-5">
        <Form.Label>Selection Process <span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="checkbox">
          <Row>
            {['Resume Shortlisting','Aptitude Test','Technical Test','Pre-Placement Test','Group Discucssion','Technical Interview','HR Interview','Other'].map((x) => (
              <Col sm={6} key={x}>
                <Form.Check.Input type="checkbox" label={x} name="selectionprocess" value={x} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.selectionprocess && errors.selectionprocess} required></Form.Check.Input>
                <Form.Check.Label>{x}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{touched.selectionprocess? errors.selectionprocess:''}</span>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Breifly explain the selection procedure (attach details)</Form.Label>
        <Form.Control type="text" value={values.selection_file?values.selection_file.name:''} disabled />
        <p className="select-feedback">{errors.selection_file}</p>
        <Form.Control type="file" name='selection_file' accept="application/pdf" onChange={(event) => {setFieldValue("selection_file", event.currentTarget.files[0])}} />
        <Form.Text className="text-muted">
          PDF (Max. 10MB)
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>or Describe the Selection Procedure</Form.Label>
        <Form.Control as="textarea" className="text-area" name="selection" onChange={handleChange} onBlur={handleBlur} ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Academic Requirements</Form.Label>
        <Form.Control as="textarea" className="text-area"  name="requirements" onChange={handleChange} onBlur={handleBlur}></Form.Control>
        <Form.Text className="text-muted">Mention any academic requirements such as CPI cutoff, branch, etc.</Form.Text>
      </Form.Group>
    </>
  )
}

export default SelectionProcess