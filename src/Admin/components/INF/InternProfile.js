import { Form, Row, Col, Container } from "react-bootstrap";
import banner from "../../../images/banner.jpg";
import {
  inf_smalltext_max_character_count,
  inf_textarea_max_character_count,
  inf_text_max_character_count,
} from "./limit_constants";
import MultipleFileInput from "./MultipleFileInput";

const InternProfile = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  isValid,
  errors,
  dirty,
  setFieldValue,
  submitCount,
  internshipdescription_file,
  setInternshipdescription_file,
  salary_file,
  setSalary_file,
}) => {
  const allBranches = ["CSE", "EE", "MMAE", "EP", "MNC", "CIVIL", "CHEMICAL"];
  const defaultBranches = ["CSE", "EE", "MMAE", "EP"];
  const selectedBranches =
    values.years?.includes("Second Year") ||
    values.years?.includes("Third Year")
      ? allBranches
      : defaultBranches;
  return (
    <>
      <Container className="p-0 mb-5" fluid>
        {/* <div className="w-100 position-relative banner-container">
          <img className="fix banner p-0" alt="banner" src="https://www.iitdh.ac.in/sites/default/files/2023-10/slide-02-new_3.jpg"></img>
          <div className="fix w-100 h-100 haze">
            <div className="center text-center w-100">INTERNSHIP PROFILE</div>
          </div>
        </div> */}
      </Container>
      <hr className="pd" />
      <MultipleFileInput
        stateVar={internshipdescription_file}
        setStateVar={setInternshipdescription_file}
        name="interhsipdescription_file"
        label="Internship Description"
      />
      <Form.Group className="mb-5">
        <Form.Label>
          Internship Designation Offered <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          maxLength={inf_text_max_character_count}
          type="text"
          name="designation"
          value={values.designation}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.designation && errors.designation}
        />
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.designation}{" "}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>
          Location(s) of Internship <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          maxLength={inf_smalltext_max_character_count}
          type="text"
          name="locations"
          value={values.locations}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.locations && errors.locations}
        />
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.locations}{" "}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>
          Internship Details <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          as="textarea"
          maxLength={inf_textarea_max_character_count}
          className="text-area"
          name="details"
          value={values.details}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.details && errors.details}
        ></Form.Control>
        <Form.Text className="text-muted">
          Short descriptions of internship being offered and skills required
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.details}{" "}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>
          Internship Type <span className="text-danger">*</span>
        </Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {["Work from home", "Work from office"].map((type) => (
              <Col sm={6} key={type}>
                <Form.Check.Input
                  type="radio"
                  label={type}
                  name="worktype"
                  value={type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.worktype && errors.worktype}
                  checked={values.worktype.includes(type)}
                ></Form.Check.Input>
                <Form.Check.Label>{type}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">
          {errors.worktype && touched.worktype ? errors.worktype : ""}
        </span>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>
          Internship Season <span className="text-danger">*</span>
        </Form.Label>
        <Form.Check className="form-check" type="checkbox">
          <Row>
            {[
              "Summer vacation Internship (May-July)",
              "Autumn co-op Internship (Aug-Nov)",
              "Winter vacation Internship (Dec)",
              "Spring co-op Internship (Jan-April)",
            ].map((x) => (
              <Col sm={6} key={x.substring(0, 6)}>
                <Form.Check.Input
                  type="checkbox"
                  label={x}
                  name="season"
                  value={x.substring(0, 6)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.season && errors.season}
                  checked={values.season.includes(x.substring(0, 6))}
                ></Form.Check.Input>
                <Form.Check.Label>{x}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">
          {errors.season && touched.season ? errors.season : ""}
        </span>
      </Form.Group>

      <Form.Group as={Row} className="mb-5">
        <Form.Label column>
          Tentative Date of joining <span className="text-danger">*</span>
        </Form.Label>
        <Col>
          <Form.Control
            type="date"
            name="startdate"
            value={values.startdate}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.startdate && errors.startdate}
          />
          <Form.Control.Feedback type="invalid">
            {" "}
            {errors.startdate}{" "}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-5">
        <Form.Label column>
          Tentative Date of completion <span className="text-danger">*</span>
        </Form.Label>
        <Col>
          <Form.Control
            type="date"
            name="enddate"
            value={values.enddate}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.enddate && errors.enddate}
          />
          <Form.Control.Feedback type="invalid">
            {" "}
            {errors.enddate}{" "}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group className="mb-5">
  <Form.Label>
    Are the following students eligible to apply?{" "}
    <span className="text-danger">*</span>
  </Form.Label>
  <Form.Check className="form-check" type="checkbox">
    <Row>
      {['Btech', 'MS', 'MTech', 'PHD' ,'BSMS'].map((degree) => (
        <Col sm={4} key={degree}>
          <Form.Check.Input 
            type="checkbox" 
            name="eligibledegree"
            value={degree}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.eligibledegree && errors.eligibledegree}
            checked={values.eligibledegree?.includes(degree)}
          />
          <Form.Check.Label>{degree}</Form.Check.Label>
        </Col>
      ))}
    </Row>
  </Form.Check>
  <span className="select-feedback">
    {errors.eligibledegree && touched.eligibledegree ? errors.eligibledegree : ""}
  </span>
</Form.Group>
      <Form.Group className="mb-5">
  <Form.Label>Eligible Students to apply</Form.Label>
  <Form.Check className="form-check" type="checkbox">
    <Row>
      {["Fourth Year" , "Third Year","Second Year" ].map((year) => (
        <Col sm={4} key={year}>
          <Form.Check.Input
            type="checkbox"
            name="years"
            value={year}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.years && errors.years}
            checked={values.years?.includes(year)}
          />
          <Form.Check.Label>{year}</Form.Check.Label>
        </Col>
      ))}
    </Row>
  </Form.Check>
  <span className="select-feedback">
    {errors.years && touched.years ? errors.years : ""}
  </span>
</Form.Group>

<Form.Group className="mb-5">
  <Form.Label>
    Eligible Branches <span className="text-danger">*</span>
  </Form.Label>
  <Form.Check className="form-check" type="checkbox">
    <Row>
      {selectedBranches.map((x) => (
        <Col key={x} sm={6}>
          <Form.Check.Input
            type="checkbox"
            name="branch"
            value={x}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.branch && errors.branch}
            checked={values.branch?.includes(x)}
          />
          <Form.Check.Label>{x}</Form.Check.Label>
        </Col>
      ))}
    </Row>
  </Form.Check>
  <span className="select-feedback">
    {touched.branch ? errors.branch : ""}
  </span>
</Form.Group>
      {/* <Form.Group className="mb-5">
        <Form.Label>
        Are sophomores (2nd Year) eligible as well?{" "}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Check className="form-check" type="radio">
          <Row>
            {["Yes", "No"].map((eligible) => (
              <Col sm={6} key={eligible}>
                <Form.Check.Input
                  type="radio"
                  label={eligible}
                  name="sophomoresallowed"
                  value={eligible}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.sophomoresallowed && errors.sophomoresallowed}
                  checked={values.sophomoresallowed.includes(eligible)}
                ></Form.Check.Input>
                <Form.Check.Label>{eligible}</Form.Check.Label>
              </Col>
            ))}
          </Row>
        </Form.Check>
        <span className="select-feedback">
          {errors.sophomoresallowed && touched.sophomoresallowed ? errors.sophomoresallowed : ""}
        </span>
      </Form.Group> */}

     
      <Row>
        <Col sm={6}>
      <Form.Group className="mb-3">
        <Form.Label>Minimum No. of Hires</Form.Label>
        <Form.Control  name='numoffers' value={values.numoffers} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.numoffers && errors.numoffers} />
        <Form.Control.Feedback type="invalid"> {errors.numoffers} </Form.Control.Feedback>
        </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3">
        <Form.Label>Expected  No. of Offers</Form.Label>
        <Form.Control  name='expoffers' value={values.expoffers} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.expoffers && errors.expoffers} />
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
      <hr className="pd" />
      <MultipleFileInput
        stateVar={salary_file}
        setStateVar={setSalary_file}
        name="stipend_benefits_file"
        label="Stipend and Other Facilities description"
      />
      <Form.Group className="mb-5 w-50">
        <Form.Label>
          Stipend <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
         
          name="stipend"
          value={values.stipend}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.stipend && errors.stipend}
        />
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.stipend}{" "}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">(in INR/Month)</Form.Text>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label>Facilities provided</Form.Label>
        <Form.Check className="form-check" type="checkbox">
          <Row>
            {["Accommodation", "Transport", "Food", "Medical Facility"].map(
              (x) => (
                <Col sm={6} key={x}>
                  <Form.Check.Input
                    type="checkbox"
                    label={x}
                    name="facilities"
                    value={x.split(" ")[0]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.facilities && errors.facilities}
                    checked={values.facilities.includes(x.split(" ")[0])}
                  ></Form.Check.Input>
                  <Form.Check.Label>{x.split(" ")[0]}</Form.Check.Label>
                </Col>
              )
            )}
          </Row>
        </Form.Check>
        <span className="select-feedback">
          {errors.facilities && touched.facilities ? errors.facilities : ""}
        </span>
      </Form.Group>

      <Form.Group className="mb-5">
        <Form.Label> Other available facilities (if any)</Form.Label>
        <Form.Control
          as="textarea"
          maxLength={inf_textarea_max_character_count}
          className="text-area"
          name="other_facilities"
          value={values.other_facilities}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.other_facilities && errors.other_facilities}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {" "}
          {errors.other_facilities}{" "}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default InternProfile;
