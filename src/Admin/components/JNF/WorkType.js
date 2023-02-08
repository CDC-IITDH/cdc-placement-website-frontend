import { Form, Row, Col, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'
import { jnf_smalltext_max_character_count, jnf_textarea_max_character_count, jnf_text_max_character_count } from "./limit_constants";
import MultipleFileInput from "./MultipleFileInput";

const WorkType = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty, setFieldValue, submitCount, jobdescription_file, setJobdescription_file,  salary_file, setSalary_file}) => {
  return (
    <>

      <Container className="p-0 mb-5" fluid>
        <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src={banner}></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">
              WORK TYPE
            </div>
          </div>
        </div>
      </Container>

      {/* Common attributes of job and internship */}

      <Form.Group className="mb-5">
          <Form.Label>Choose work type <span className="text-danger">*</span></Form.Label>
          <Form.Check className="form-check" type="checkbox">
            <Row>
              {["JOB","INTERN"].map((x) => (
                <Col key={x} sm={6}>
                  <Form.Check.Input type="checkbox" name="work_type" value={x} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.work_type && errors.work_type} checked={values.work_type.includes(x)}></Form.Check.Input>
                  <Form.Check.Label>{x}</Form.Check.Label>
                </Col>
              ))}
            </Row>
          </Form.Check>
          <span className="select-feedback">{touched.work_type? errors.work_type:''}</span>
      </Form.Group>

      <hr className="pd" />
      
      <MultipleFileInput stateVar={jobdescription_file} setStateVar={setJobdescription_file} name="jobdescription_file" label ="Job Description" />
      
      <Form.Group className="mb-5">
        <Form.Label>Job Designation Offered <span className="text-danger">*</span></Form.Label>
        <Form.Control maxLength={jnf_text_max_character_count} type="text" name='designation' value={values.designation} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.designation && errors.designation} />
        <Form.Control.Feedback type="invalid"> {errors.designation} </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-5">
        <Form.Label>Location(s) of Job <span className="text-danger">*</span></Form.Label>
        <Form.Control maxLength={jnf_smalltext_max_character_count} type="text" name='locations' value={values.locations} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.locations && errors.locations} />
        <Form.Control.Feedback type="invalid"> {errors.locations} </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-5">
        <Form.Label>Job Details <span className="text-danger">*</span></Form.Label>
        <Form.Control as="textarea" maxLength={jnf_textarea_max_character_count} className="text-area"  name='details' value={values.details} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.details && errors.details}></Form.Control>
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
        <Form.Label>Eligible Branches <span className="text-danger">*</span></Form.Label>
          <Form.Check className="form-check" type="checkbox">
            <Row>
              {['CSE','EE','MMAE'].map((x) => (
                <Col key={x} sm={6}>
                  <Form.Check.Input type="checkbox" name="branch" value={x} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.branch && errors.branch} checked={values.branch.includes(x)}></Form.Check.Input>
                  <Form.Check.Label>{x}</Form.Check.Label>
                </Col>
              ))}
            </Row>
          </Form.Check>
        <span className="select-feedback">{touched.branch? errors.branch:''}</span>
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

export default WorkType