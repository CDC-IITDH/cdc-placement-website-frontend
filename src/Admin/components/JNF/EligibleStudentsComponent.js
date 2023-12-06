import { Form, Row, Col } from "react-bootstrap"


function EligibleGroup({values, errors, touched, handleBlur, handleChange, name, branches}) {
    const verbal = name === "btech" ? "BTech students" : name === "mtech" ? "MTech students" : name === "ms" ? "MS (by Research) students" : "PhD Scholars"
    return ( 
        <>
         <Form.Group className="mb-5">
        <Form.Label>Are {verbal} eligible to apply? <span className="text-danger">*</span></Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            <Col sm={6}>
              <Form.Check.Input type="radio" name={`${name}allowed`} value="true" onChange={handleChange} onBlur={handleBlur} isInvalid={touched[`${name}allowed`] && errors[`${name}allowed`]} checked={values[`${name}allowed`]==="true"}></Form.Check.Input>
              <Form.Check.Label>Yes</Form.Check.Label>
            </Col>
            <Col sm={6}>
              <Form.Check.Input type="radio" name={`${name}allowed`} value="false" onChange={handleChange} onBlur={handleBlur} isInvalid={touched[`${name}allowed`] && errors[`${name}allowed`]} checked={values[`${name}allowed`]=== "false"}></Form.Check.Input>
            <Form.Check.Label>No</Form.Check.Label>
            </Col>
          </Row>
        </Form.Check>
        <span className="select-feedback">{errors[`${name}allowed`] && touched[`${name}allowed`]? errors[`${name}allowed`]:''}</span>
      </Form.Group>

      {values[`${name}allowed`] === "true" && 
      <>
        <Form.Group className="mb-5">
          <Form.Label>Eligible Branches from {verbal}<span className="text-danger">*</span></Form.Label>
          <Form.Check className="form-check" type="checkbox">
            <Row>
              {branches.map((x) => (
                <Col key={x[0]} sm={6}>
                  <Form.Check.Input type="checkbox" name={`${name}branches`} value={x[0]} onChange={handleChange} onBlur={handleBlur} isInvalid={touched[`${name}branches`] && errors[`${name}branches`]} checked={values[`${name}branches`].includes(x[0])}></Form.Check.Input>
                  <Form.Check.Label>{x[1]}</Form.Check.Label>
                </Col>
              ))}
            </Row>
          </Form.Check>
          <span className="select-feedback">{touched[`${name}branches`]? errors[`${name}branches`]:''}</span>
        </Form.Group>
      </>
      }
        </>
     );
}

export default EligibleGroup;