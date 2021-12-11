import { Form, Row, Col, Container, FormControl } from "react-bootstrap"
import banner from '../../../images/banner.jpg'

const SelectionProcess = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => {
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" src={banner}></img>
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
              <Col sm={6}>
                <Form.Check.Input type="checkbox" label={x} name="selectionprocess" value={x} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.selectionprocess && errors.selectionprocess} required></Form.Check.Input>
                <Form.Check.Label>{x}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{errors.selectionprocess}</span>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Breifly explain the selection procedure (attach details)</Form.Label>
        <Form.Control type="file" />
        <Form.Text className="text-muted">
          PDF (Max. 10MB)
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>or Describe the Selection Procedure</Form.Label>
        <Form.Control as="textarea" className="text-area"></Form.Control>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Academic Requirements</Form.Label>
        <Form.Control as="textarea" className="text-area"></Form.Control>
        <Form.Text className="text-muted">Mention any academic requirements such as CPI cutoff, branch, etc.</Form.Text>
      </Form.Group>
    </>
  )
}

export default SelectionProcess