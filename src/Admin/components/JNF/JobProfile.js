import { Form, Row, Col, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'

const JobProfile = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty, setFieldValue}) => {
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src={banner}></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">
              JOB PROFILE
            </div>
          </div>
        </div>
      </Container>
      <hr className="pd" />
      <Form.Group className="mb-5">
        <Form.Label>Job Description</Form.Label>
        <Form.Control type="file" name='jobdescription_file' onChange={(event) => {setFieldValue("jobdescription_file", event.currentTarget.files[0])}} />
        <Form.Text className="text-muted">
          PDF (Max. 10MB)
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Job Designation Offered <span className="text-danger">*</span></Form.Label>
        <Form.Control type="text" name='designation' value={values.designation} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.designation && errors.designation} />
        <Form.Control.Feedback type="invalid"> {errors.designation} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Location(s) of Job <span className="text-danger">*</span></Form.Label>
        <Form.Control type="text" name='locations' value={values.locations} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.locations && errors.locations} />
        <Form.Control.Feedback type="invalid"> {errors.locations} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Job Details <span className="text-danger">*</span></Form.Label>
        <Form.Control as="textarea" className="text-area"  name='details' value={values.details} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.details && errors.details}></Form.Control>
        <Form.Text className="text-muted">
          Short descriptions of job being offered and skills required
        </Form.Text>
        <Form.Control.Feedback type="invalid"> {errors.details} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5 w-50">
        <Form.Label>Tentative Date of Joining <span className="text-danger">*</span></Form.Label>
        <Form.Control type="date" name='date' value={values.date} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.date && errors.date} />
        <Form.Control.Feedback type="invalid"> {errors.date} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Are MS research scholars (postgraduates) eligible to apply? <span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {['Yes','No'].map((eligible) => (
              <Col sm={6} key={eligible}>
                <Form.Check.Input type="radio" label={eligible} name="research" value={eligible} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.research && errors.research}></Form.Check.Input>
                <Form.Check.Label>{eligible}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{touched.research? errors.research:''}</span>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Tentative No. of Offers</Form.Label>
        <Form.Control type="number" name='numoffers' value={values.numoffers} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.numoffers && errors.numoffers} />
        <Form.Control.Feedback type="invalid"> {errors.numoffers} </Form.Control.Feedback>
        <Form.Text className="text-muted">
          The company when at the end of the selection procedure, is encouraged to maintain a list of waiting candidates, in the event that one of the offered candidates is unable to take up the position.
        </Form.Text>
      </Form.Group>
    </>
  )
}

export default JobProfile