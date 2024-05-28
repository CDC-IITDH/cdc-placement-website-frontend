import { Form, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'
import { jnf_smalltext_max_character_count, jnf_text_max_character_count } from "./limit_constants"

const ContactDetails = ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => {
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        {/* <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src="https://www.iitdh.ac.in/sites/default/files/2023-10/slide-02-new_3.jpg"></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">
              COMPANY CONTACT DETAILS
            </div>
          </div>
        </div> */}
      </Container>
      <hr className="pd" />
      <Form.Group className="mb-5 w-50">
        <Form.Label>Contact Person <span className="text-danger">*</span></Form.Label>
        <Form.Control maxLength={jnf_text_max_character_count} type="text" name='contact' value={values.contact} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.contact && errors.contact} />
        <Form.Control.Feedback type="invalid"> {errors.contact} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5 w-50">
        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
        <Form.Control maxLength={jnf_smalltext_max_character_count} type="text" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.email && errors.email} />
        <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
      </Form.Group> 
      <Form.Group className="mb-5 w-50">
        <Form.Label>Mobile <span className="text-danger">*</span></Form.Label>
        <Form.Control type="number" name='mobile' value={values.mobile} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.mobile && errors.mobile} />
        <Form.Control.Feedback type="invalid"> {errors.mobile} </Form.Control.Feedback>
      </Form.Group>
      {/* <Form.Group className="mb-5 w-50">
        <Form.Label>Telephone</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="(000) 000-0000" name='telephone' value={values.telephone} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.telephone && errors.telephone} />
        <Form.Control.Feedback type="invalid"> {errors.telephone} </Form.Control.Feedback>
      </Form.Group>  */}
    </>
  )
}

export default ContactDetails