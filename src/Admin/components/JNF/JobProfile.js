import { Form, Row, Col, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'
import { jnf_smalltext_max_character_count, jnf_textarea_max_character_count, jnf_text_max_character_count } from "./limit_constants";
import MultipleFileInput from "./MultipleFileInput";

const JobProfile = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty, setFieldValue, submitCount, jobdescription_file, setJobdescription_file,  salary_file, setSalary_file}) => {
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
 
      <Form.Group className="mb-5">
        <Form.Label>Are MS research scholars (postgraduates) eligible to apply? <span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {['Yes','No'].map((eligible) => (
              <Col sm={6} key={eligible}>
                <Form.Check.Input type="radio" label={eligible} name="research" value={eligible} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.research && errors.research} checked={values.research.includes(eligible)}></Form.Check.Input>
                <Form.Check.Label>{eligible}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{errors.research && touched.research? errors.research:''}</span>
      </Form.Group>
      

      <p className="mb-5 gray-blue"><b>
        <u>Note:</u> In case of different salary structures being offer to BTech and MS students, the details regarding the same are to be clearly mentioned in the fields below.
      </b></p>
      
      <MultipleFileInput stateVar={salary_file} setStateVar={setSalary_file} name="salary_file" label ="Salary Description" />

      <Form.Group className="mb-5 w-50">
        <Form.Label>Cost to Company (CTC) <span className="text-danger">*</span></Form.Label>
        <Form.Control type="number" name='ctc' value={values.ctc} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.ctc && errors.ctc} />
        <Form.Control.Feedback type="invalid"> {errors.ctc} </Form.Control.Feedback>
        <Form.Text className="text-muted">(in INR/year)</Form.Text>
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
        <Form.Control as="textarea" maxLength={jnf_textarea_max_character_count} className="text-area" name='bonddetails' value={values.bonddetails} onChange={handleChange} onBlur={handleBlur}></Form.Control>
      </Form.Group>
    
    </>
  )
}

export default JobProfile