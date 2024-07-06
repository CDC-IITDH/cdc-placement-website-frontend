import { Form, Row, Col, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'
import { jnf_smalltext_max_character_count, jnf_textarea_max_character_count, jnf_text_max_character_count } from "./limit_constants";
import MultipleFileInput from "./MultipleFileInput";

const JobProfile = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty, setFieldValue, submitCount, jobdescription_file, setJobdescription_file,  salary_file, setSalary_file}) => {
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        {/* <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src="https://www.iitdh.ac.in/sites/default/files/2023-10/slide-02-new_3.jpg"></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">
              JOB PROFILE
            </div>
          </div>
        </div> */}
      </Container>
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
            {['CSE','EE','MMAE','EP'].map((x) => (
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
        <Form.Label>Are the following students eligible to apply? 
        {/* <span className="text-danger">*</span> */}
        </Form.Label>
        {/* <Form.Check className="form-check" type="radio">
          <Row>
            {['Yes','No'].map((eligible) => (
              <Col sm={6} key={eligible}>
                <Form.Check.Input type="radio" label={eligible} name="research" value={eligible} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.research && errors.research} checked={values.research.includes(eligible)}></Form.Check.Input>
                <Form.Check.Label>{eligible}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check> */}
  
        <Form.Check className="form-check" type="checkbox">
          <Row>
        {['MS', 'MTech', 'PHD'].map((degree) => (
            <Col sm={4} key={degree}>
                <Form.Check type="checkbox">
                    <Form.Check.Input 
                        type="checkbox" 
                        name="research"
                        value={degree}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.research && errors.research}
                        checked={values.research.includes(degree)}
                    />
                    <Form.Check.Label>{degree}</Form.Check.Label>
                </Form.Check>
            </Col>
        ))}
    </Row>
</Form.Check>


        <span className="select-feedback">{errors.research && touched.research? errors.research:''}</span>
      </Form.Group>
      <Row>
        <Col sm={6}>
      <Form.Group className="mb-3">
        <Form.Label>Minimum No. of Hires</Form.Label>
        <Form.Control type="number" name='numoffers' value={values.numoffers} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.numoffers && errors.numoffers} />
        <Form.Control.Feedback type="invalid"> {errors.numoffers} </Form.Control.Feedback>
        </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3">
        <Form.Label>Expected  No. of Offers</Form.Label>
        <Form.Control type="number" name='expoffers' value={values.expoffers} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.expoffers && errors.expoffers} />
        <Form.Control.Feedback type="invalid"> {errors.expoffers} </Form.Control.Feedback>
        
        </Form.Group>
        </Col>
        <Form.Text className="text-muted mb-3">
          The company when at the end of the selection procedure, is encouraged to maintain a list of waiting candidates, in the event that one of the offered candidates is unable to take up the position.
        </Form.Text>
      </Row>
      <Form.Group className="mb-5">
  <Form.Label>Is backlog students eligible to apply? <span className="text-danger">*</span></Form.Label>
  <Row>
    {['Yes', 'No'].map((eligible) => (
      <Col sm={6} key={eligible}>
        <Form.Check
          type="radio"
          label={eligible}
          name="backlogEligibility"
          value={eligible}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.backlogEligibility && errors.backlogEligibility}
          checked={values.backlogEligibility === eligible}
        />
      </Col>
    ))}
  </Row>
  <span className="select-feedback">{errors.backlogEligibility && touched.backlogEligibility ? errors.backlogEligibility : ''}</span>
</Form.Group>

<Form.Group className="mb-5">
  <Form.Label>Is the position also open to PwD/ DAP? <span className="text-danger">*</span></Form.Label>
  <Row>
    {['Yes', 'No'].map((eligible) => (
      <Col sm={6} key={eligible}>
        <Form.Check
          type="radio"
          label={eligible}
          name="pwdEligibility"
          value={eligible}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.pwdEligibility && errors.pwdEligibility}
          checked={values.pwdEligibility === eligible}
        />
      </Col>
    ))}
  </Row>
  <span className="select-feedback">{errors.pwdEligibility && touched.pwdEligibility ? errors.pwdEligibility : ''}</span>
</Form.Group>

      <p className="mb-5 gray-blue"><b>
        <u>Note:</u> In case of different salary structures being offer to BTech and MS students, the details regarding the same are to be clearly mentioned in the fields below.
      </b></p>
      <MultipleFileInput stateVar={salary_file} setStateVar={setSalary_file} name="salary_file" label ="Salary Description" />
      <Form.Group className="mb-5 w-50">
        <Form.Label>Cost to Company (CTC) <span className="text-danger">*</span></Form.Label>
        <Form.Control type="number" name='ctc' value={values.ctc} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.ctc && errors.ctc} />
        <Form.Control.Feedback type="invalid"> {errors.ctc} </Form.Control.Feedback>
        <Form.Text className="text-muted">(in INR/year)<br />Example: If CTC is 15LPA, Enter 1500000</Form.Text>
      </Form.Group>
      <Form.Group className="mb-5 w-50">
        <Form.Label>Gross <span className="text-danger">*</span></Form.Label>
        <Form.Control type="number" name='gross' value={values.gross} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.gross && errors.gross} />
        <Form.Control.Feedback type="invalid"> {errors.gross} </Form.Control.Feedback>
        <Form.Text className="text-muted">(in INR/year)</Form.Text>
      </Form.Group>
      <Form.Group className="mb-5 w-50">
        <Form.Label>Take Home <span className="text-danger">*</span></Form.Label>
        <Form.Control type="number" name='takehome' value={values.takehome} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.takehome && errors.takehome} />
        <Form.Control.Feedback type="invalid"> {errors.takehome} </Form.Control.Feedback>
        <Form.Text className="text-muted">(in INR/year)</Form.Text>
      </Form.Group>
      <Form.Group className="mb-5 w-50">
        <Form.Label>Bonus/Incentives (if any)</Form.Label>
        <Form.Control type="number" name='bonus' value={values.bonus} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.bonus && errors.bonus} />
        <Form.Control.Feedback type="invalid"> {errors.bonus} </Form.Control.Feedback>
        <Form.Text className="text-muted">(in INR/year)</Form.Text>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Details of Bond (if any)</Form.Label>
        <Form.Control as="textarea" maxLength={jnf_textarea_max_character_count} className="text-area" name='bonddetails' value={values.bonddetails} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.bonddetails && errors.bonddetails}></Form.Control>
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.bonddetails}{" "}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default JobProfile