import { Form, Row, Col, Container } from "react-bootstrap"
import banner from '../../../images/banner.jpg'
import { jnf_smalltext_max_character_count, jnf_textarea_max_character_count, jnf_text_max_character_count } from "./constants";
import MultipleFileInput from "./MultipleFileInput";

const CompOverview = ({handleChange, handleBlur, values, touched, errors, setFieldValue, submitCount, compdescription_file, setCompdescription_file}) => {
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src={banner}></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">COMPANY OVERVIEW</div>
          </div>
        </div>
      </Container>
      <hr className="pd" />
      <Form.Group className="mb-5">
        <Form.Label>
          Company Name <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          maxLength={jnf_smalltext_max_character_count}
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.name && errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.name}{" "}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>
          Website Link <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          maxLength={jnf_text_max_character_count}
          type="text"
          name="link"
          value={values.link}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.link && errors.link}
        />
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.link}{" "}
        </Form.Control.Feedback>
      </Form.Group>
      <MultipleFileInput
        stateVar={compdescription_file}
        setStateVar={setCompdescription_file}
        name="compdescription_file"
        label="Brief About the Company"
      />
      <Form.Group className="mb-5">
        <Form.Label>or Describe in Words</Form.Label>
        <Form.Control
          as="textarea"
          maxLength={jnf_textarea_max_character_count}
          className="text-area"
          name="compdescription"
          value={values.compdescription}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.compdescription && errors.compdescription}
        />
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.compdescription}{" "}
        </Form.Control.Feedback>  
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>
          Company Address <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          as="textarea"
          maxLength={jnf_textarea_max_character_count}
          className="text-area"
          name="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.address && errors.address}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.address}{" "}
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-5">
            <Form.Label>
              City <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              maxLength={jnf_smalltext_max_character_count}
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.city && errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {" "}
              {errors.city}{" "}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-5">
            <Form.Label>
              State <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              maxLength={jnf_smalltext_max_character_count}
              type="text"
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.state && errors.state}
            />
            <Form.Control.Feedback type="invalid">
              {" "}
              {errors.state}{" "}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-5">
            <Form.Label>
              Country <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              maxLength={jnf_smalltext_max_character_count}
              type="text"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.country && errors.country}
            />
            <Form.Control.Feedback type="invalid">
              {" "}
              {errors.country}{" "}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-5">
            <Form.Label>
              Zip/Pin <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.pincode && errors.pincode}
            />
            <Form.Control.Feedback type="invalid">
              {" "}
              {errors.pincode}{" "}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-5">
        <Form.Label>
          Type of Organisation <span className="text-danger">*</span>
        </Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {[
              "Govt. Owned",
              "MNC (Foreign Origin)",
              "MNC (Indian Origin)",
              "Private Sector",
              "Public Sector",
              "Start-Up",
              "Other",
            ].map((type) => (
              <Col sm={6} key={type}>
                <Form.Check.Input
                  type="radio"
                  label={type}
                  name="type"
                  value={type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.type && errors.type}
                  checked={values.type.includes(type)}
                ></Form.Check.Input>
                <Form.Check.Label>{type}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">
          {errors.type && touched.type ? errors.type : ""}
        </span>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>
          Nature of Business <span className="text-danger">*</span>
        </Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {[
              "Manufacturing",
              "Consulting",
              "Finance",
              "Core (Technical)",
              "FMCG",
              "I.T./ITeS",
              "Management",
              "Education (Teaching)",
              "NGO",
              "Research & Development",
              "Other",
            ].map((nature) => (
              <Col key={nature} sm={6}>
                <Form.Check.Input
                  type="radio"
                  label={nature}
                  name="nature"
                  value={nature}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.nature && errors.nature}
                  checked={values.nature.includes(nature)}
                ></Form.Check.Input>
                <Form.Check.Label>{nature}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">
          {errors.nature && touched.nature ? errors.nature : ""}
        </span>
      </Form.Group>
    </>
  );
}

export default CompOverview