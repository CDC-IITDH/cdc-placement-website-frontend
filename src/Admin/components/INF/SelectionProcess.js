import { Form, Row, Col, Container } from "react-bootstrap";
import banner from "../../../images/banner.jpg";
import { inf_textarea_max_character_count } from "./limit_constants";
import MultipleFileInput from "./MultipleFileInput";

const SelectionProcess = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  isValid,
  errors,
  dirty,
  setFieldValue,
  selection_file,
  setSelection_file,
}) => {
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src="https://www.iitdh.ac.in/sites/default/files/2023-10/slide-02-new_3.jpg"></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">SELECTION PROCESS</div>
          </div>
        </div>
      </Container>
      <p className="mb-3 text-center">
        Describe the tentative selection process for the students.
      </p>
      <hr className="pd" />
      <Form.Group className="mb-5">
        <Form.Label>
          Tentative selection Process <span className="text-danger">*</span>
        </Form.Label>
        <Form.Check className="form-check" type="checkbox">
          <Row>
            {[
              "Resume Shortlisting",
              "Aptitude Test",
              "Technical Test",
              "Pre-Placement Test",
              "Group Discucssion",
              "Technical Interview",
              "HR Interview",
            ].map((x) => (
              <Col sm={6} key={x}>
                <Form.Check.Input
                  type="checkbox"
                  label={x}
                  name="selectionprocess"
                  value={x}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.selectionprocess && errors.selectionprocess
                  }
                  checked={values.selectionprocess.includes(x)}
                ></Form.Check.Input>
                <Form.Check.Label>{x}</Form.Check.Label>
              </Col>
            ))}
            <Col sm={6} key={"Other"} className="py-1">
              <Form.Check.Input
                type="checkbox"
                label={"Other"}
                name="selectionprocess"
                value={"Other"}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.selectionprocess && errors.selectionprocess}
                checked={values.selectionprocess.includes("Other")}
              ></Form.Check.Input>
              <Form.Check.Label>{"Other:"}</Form.Check.Label>
              <Form.Control
                type="text"
                name="selectionprocess_other"
                value={values.selectionprocess_other}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-75 d-inline h-63 mx-2"
                disabled={!values.selectionprocess.includes("Other")}
              />
            </Col>
          </Row>
        </Form.Check>
        <span className="select-feedback">
          {touched.selectionprocess ? errors.selectionprocess : ""}
        </span>
      </Form.Group>
      <Form.Group className="mb-5">
        <MultipleFileInput
          stateVar={selection_file}
          setStateVar={setSelection_file}
          name="selction_file"
          label="Breifly explain the selection procedure (attach details)"
        />
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>or Describe the Selection Procedure</Form.Label>
        <Form.Control
          as="textarea"
          maxLength={inf_textarea_max_character_count}
          className="text-area"
          name="selection"
          value={values.selection}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.selection && errors.selection}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.selection}{" "}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Academic Requirements</Form.Label>
        <Form.Control
          as="textarea"
          maxLength={inf_textarea_max_character_count}
          className="text-area"
          name="requirements"
          value={values.requirements}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.requirements && errors.requirements}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.requirements}{" "}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Mention any academic requirements such as CPI cutoff, branch, etc.
        </Form.Text>
      </Form.Group>
    </>
  );
};

export default SelectionProcess;
