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

    </>
  )
}

export default WorkType