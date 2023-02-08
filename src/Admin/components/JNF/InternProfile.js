import { Form, Row, Col, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'
import { jnf_smalltext_max_character_count, jnf_textarea_max_character_count, jnf_text_max_character_count } from "./limit_constants";

const InternProfile = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty, setFieldValue, submitCount, jobdescription_file, setJobdescription_file,  salary_file, setSalary_file}) => {
  return (
    <>

      <Container className="p-0 mb-5" fluid>
        <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src={banner}></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">
              INTERN PROFILE
            </div>
          </div>
        </div>
      </Container>

      <hr className="pd" />
      
      <Form.Group className="mb-5">
        <Form.Label>Internship Season<span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="checkbox">
          <Row>
            {['Summer','Autumn','Winter','Spring'].map((x) => (
              <Col key={x} sm={6}>
                <Form.Check.Input type="checkbox" name="internship_season" value={x} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.internship_season && errors.internship_season} checked={values.internship_season.includes(x)}></Form.Check.Input>
                <Form.Check.Label>{x}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{touched.internship_season? errors.internship_season:''}</span>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>Eligible Batches <span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="checkbox">
          <Row>
            {['2018','2019','2020','2021'].map((x) => (
              <Col key={x} sm={6}>
                <Form.Check.Input type="checkbox" name="batch" value={x} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.batch && errors.batch} checked={values.batch.includes(x)}></Form.Check.Input>
                <Form.Check.Label>{x}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{touched.batch? errors.batch:''}</span>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>Internship Type <span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {['Offline', 'Remote', 'Other'].map((nature) => (
              <Col key={nature} sm={6}>
                <Form.Check.Input type="radio" label={nature} name="internship_type" value={nature} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.internship_type && errors.internship_type} checked={values.internship_type.includes(nature)}></Form.Check.Input>
                <Form.Check.Label>{nature}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{errors.internship_type && touched.internship_type? errors.internship_type:''}</span>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>Are sophomores eligible to apply? <span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {['Yes','No'].map((eligible) => (
              <Col sm={6} key={eligible}>
                <Form.Check.Input type="radio" label={eligible} name="sophomores" value={eligible} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.sophomores && errors.sophomores} checked={values.sophomores.includes(eligible)}></Form.Check.Input>
                <Form.Check.Label>{eligible}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">{errors.sophomores && touched.sophomores? errors.sophomores:''}</span>
      </Form.Group>

      <Form.Group className="mb-5 w-50">
        <Form.Label>Stipend <span className="text-danger">*</span></Form.Label>
        <Form.Control type="number" name='stipend' value={values.stipend} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.stipend && errors.stipend} />
        <Form.Control.Feedback type="invalid"> {errors.stipend} </Form.Control.Feedback>
        <Form.Text className="text-muted">(in INR/month)</Form.Text>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>Other facilities available </Form.Label>
        <Form.Control as="textarea" maxLength={jnf_textarea_max_character_count} className="text-area" name='internship_other_facilities' value={values.internship_other_facilities} onChange={handleChange} onBlur={handleBlur}></Form.Control>
      </Form.Group>

    </>
  )
}

export default InternProfile