import { Form, Button, Col, Container, Row } from "react-bootstrap";
import "./form.css";
import CompOverview from "./CompOverview";
import { Formik } from "formik";
import * as yup from "yup";
import Instructions from "./Instructions";
import { useFormikContext } from "formik";
import { useState, useEffect, useRef } from "react";
import JobProfile from "./JobProfile";
import SelectionProcess from "./SelectionProcess";
import ContactDetails from "./ContactDetails";
import API_ENDPOINT from "../../../api/api_endpoint";
import { Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { getCookie } from "../../../utils/getCookie";
import swal from "sweetalert2";
import MultiStepProgressBar from "./MultiStepProgressBar";

import {
  jnf_smalltext_max_character_count,
  jnf_textarea_max_character_count,
  jnf_text_max_character_count,
} from "./limit_constants";
import Header from "./Header";
import { set } from "date-fns";

const JNF = ({ setShowLoader }) => {
  const year = "2024-2025";
  const [preFill, setPreFill] = useState();
  var initialValues = {
    name: preFill?.placement_data.company_name || "",
    link: preFill?.placement_data.website || "",
    compdescription: preFill?.placement_data.company_details || "",
    address: preFill?.placement_data.address || "",
    city: preFill?.placement_data.city || "",
    state: preFill?.placement_data.state || "",
    country: preFill?.placement_data.country || "",
    pincode: preFill?.placement_data.pin_code || "",
    type: preFill?.placement_data.company_type || "",
    nature: preFill?.placement_data.nature_of_business || "",
    designation: "",
    locations: "",
    details: "",
    date: "",
    establishdate:"",//newly added needs to be checked
    branch: ['CSE', 'EE'],
    eligiblestudents: ['Btech'],
    pwdEligibility: 'No',//newly added needs to checked
    backlogEligibility: 'No',//newly added needs to checked
    medicalTest: 'No',//newly added needs to checked
    psychometricTest: 'No',//newly added needs to checked
    numoffers: "",
    expoffers: "",//newly added needs to checked
    numberOfEmployees:"",//newly added needs to checked
    ctc: "",
    companyTurnover:"",//newly added needs to checked
    gross: "",
    takehome: "",
    bonus: "",
    bonddetails: "",
    selectionprocess: "",
    selection: "",
    requirements: "",
    contact: preFill?.placement_data.contact_person_name || "",
    email: preFill?.placement_data.email || "",
    mobile: preFill?.placement_data.phone_number || "",
    telephone: preFill?.placement_data.telephone || "",
    compdescription_file: "",
    jobdescription_file: "",
    salary_file: "",
    selection_file: "",
    selectionprocess_other: "",
    cpi: "6", //new field is added needs to be checked
    isCpiRequired: 'yes'
  };
  const LOCAL_STORAGE_KEY = "vals_jnf";
  const [page, setPage] = useState(1);
  const [submitted, setSubmitted] = useState(0);
  const [error, setError] = useState("");
  const [compdescription_file, setCompdescription_file] = useState([]);
  const [jobdescription_file, setJobdescription_file] = useState([]);
  const [salary_file, setSalary_file] = useState([]);
  const [warning, setWarning] = useState();
  const [selection_file, setSelection_file] = useState([]);
  const [showComponents, setShowComponents] = useState(false);
  const [valsFromUseEffect, SetValsFromUseEffect] = useState(initialValues);
  var removeData = 0;

  const HandleBeforeLoad = () => {
    const handleAlert = () => {
      if (
        preFill ||
        window.localStorage.getItem(LOCAL_STORAGE_KEY) ===
          JSON.stringify(initialValues) ||
        !window.localStorage.getItem(LOCAL_STORAGE_KEY)
      ) {
        setShowComponents(true);

        return;
      }
      swal
        .fire({
          title: "Do you want to resume your prevous filling of the JNF?",
          text: "We have saved your previous progress. You can continue filling the JNF from where you left off. Note that you can only resume your previous filling once.",
          html: `
          We have saved your previous progress. You can continue filling the JNF from where you left off.
          <p style="color:red">Note that you can only resume your previous filling once.
          PDFs uploaded will not be saved.</p>
          `,
          icon: "question",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            SetValsFromUseEffect(
              JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
            );
            swal.fire("You can continue filling the JNF");
            setShowComponents(true);
          } else if (result.isDenied) {
            window.localStorage.setItem(
              LOCAL_STORAGE_KEY,
              JSON.stringify(initialValues)
            );
            setShowComponents(true);
          }
        });
    };

    window.addEventListener("load", handleAlert);

    return () => {
      window.removeEventListener("load", handleAlert);
    };
  };

  useEffect(() => {
    setShowLoader(false);
  }, [setShowLoader]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setWarning();
  }, [page]);

  const recaptchaRef = useRef(null);
  const termsRef = useRef(null);

  const validatePDF = (value, context) => {
    if (value) {
      console.log(value);
      return value.type === "application/pdf";
    } else {
      return true;
    }
  };

  const validateSize = (value, context) => {
    if (value) {
      console.log(value.size);
      return value.size <= 10000000;
    } else {
      return true;
    }
  };

  const AutoSave = () => {
    const { values, submitForm } = useFormikContext();

    const handleBeforeUnload = (event) => {
      event.preventDefault();

      if (!removeData && !submitted) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
      } else {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(initialValues)
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  };
  let schema = yup.object().shape({
    name: yup
      .string()
      .required("Company Name is Required")
      .max(
        jnf_smalltext_max_character_count - 1,
        `Company name should be within ${
          jnf_smalltext_max_character_count - 1
        } characters.`
      ),
    link: yup
      .string()
      .url("Please enter a valid url (eg. https://example.com)")
      .required("Website Link is Required")
      .max(
        jnf_text_max_character_count - 1,
        `Website link should be within ${
          jnf_text_max_character_count - 1
        } character limit.`
      ),
    compdescription_file: yup
      .mixed()
      .test("pdf-check", "Must be PDF", validatePDF)
      .test("size-check", "Must be smaller than 10MB", validateSize),
    jobdescription_file: yup
      .mixed()
      .test("pdf-check", "Must be PDF", validatePDF)
      .test("size-check", "Must be smaller than 10MB", validateSize),
    salary_file: yup
      .mixed()
      .test("pdf-check", "Must be PDF", validatePDF)
      .test("size-check", "Must be smaller than 10MB", validateSize),
    selection_file: yup
      .mixed()
      .test("pdf-check", "Must be PDF", validatePDF)
      .test("size-check", "Must be smaller than 10MB", validateSize),
    compdescription: yup
      .string()
      .max(
        jnf_textarea_max_character_count - 1,
        `Company details should be within ${jnf_textarea_max_character_count} characters.`
      ),
    address: yup
      .string()
      .required("Company Address is Required")
      .max(
        jnf_textarea_max_character_count - 1,
        `Company address should be within ${jnf_textarea_max_character_count} characters.`
      ),
    city: yup
      .string()
      .required("City is Required")
      .max(
        jnf_smalltext_max_character_count - 1,
        `City name should be within ${
          jnf_smalltext_max_character_count - 1
        } characters.`
      ),
    state: yup
      .string()
      .required("State is Required")
      .max(
        jnf_smalltext_max_character_count - 1,
        `State name should be within ${
          jnf_smalltext_max_character_count - 1
        } characters.`
      ),
    country: yup
      .string()
      .required("Country is Required")
      .max(
        jnf_smalltext_max_character_count - 1,
        `Country name should be within ${
          jnf_smalltext_max_character_count - 1
        } characters.`
      ),
    pincode: yup
      .number("Must be a Number")
      .required("Zip/Pin code is Required"),
    type: yup.string().required("Required"),
    nature: yup.string().required("Required"),
    designation: yup
      .string()
      .required("Designation is Required")
      .max(
        jnf_text_max_character_count - 1,
        `Designation should be within ${
          jnf_text_max_character_count - 1
        } character limit.`
      ),
    locations: yup
      .string()
      .required("Loaction is Required")
      .max(
        jnf_smalltext_max_character_count - 1,
        `Location should be within ${
          jnf_smalltext_max_character_count - 1
        } character limit.`
      ),
    details: yup
      .string()
      .required("Details are Required")
      .max(
        jnf_textarea_max_character_count - 1,
        `Details should be within ${jnf_textarea_max_character_count} character limit.`
      ),
    date: yup.string().required("Date is Required"),
    establishdate:yup.string(),
    branch: yup.array().min(1, "Choose at least one").required("Required"),
    eligiblestudents: yup.array(),
    pwdEligibility: yup.string().required("Required"),//needs to be checked
    backlogEligibility: yup.string().required("Required"),//needs to be checked
    medicalTest: yup.string().required("Required"),//needs to be checked
    psychometricTest: yup.string().required("Required"),//needs to be checked
    numoffers: yup.number().min(0, "Must be positive"),
    expoffers: yup.number().min(0, "Must be positive"),//needs to be checked
    numberOfEmployees:yup.number().min(0, "Must be positive"),//needs to be checked
    companyTurnover:yup
    .number()
    .integer("Must be an integer")
    .min(0, "Must be positive"),//needs to be checked
    ctc: yup
      .number()
      .required("CTC is Required")
      .integer("Must be an integer")
      .min(0, "Must be positive"),
    gross: yup
      .number()
      .required("Gross is Required")
      .integer("Must be an integer")
      .min(0, "Must be positive"),
    takehome: yup
      .number()
      .required("Take Home is Required")
      .integer("Must be an integer")
      .min(0, "Must be positive"),
    bonus: yup
      .number()
      .integer("Must be an integer")
      .min(0, "Must be positive"),
    bonddetails: yup
      .string()
      .max(
        jnf_textarea_max_character_count - 1,
        `Bond details should be within ${jnf_textarea_max_character_count} character limit.`
      ),
    selectionprocess: yup
      .array()
      .min(1, "Choose at least one")
      .required("Required"),
    selection: yup
      .string()
      .max(
        jnf_textarea_max_character_count - 1,
        `Selection details should be within ${jnf_textarea_max_character_count} character limit.`
      ),
    requirements: yup
      .string()
      .max(
        jnf_textarea_max_character_count - 1,
        `Requirements should be within ${jnf_textarea_max_character_count} character limit.`
      ),
    contact: yup
      .string()
      .required("Contact Name is Required")
      .max(
        jnf_text_max_character_count - 1,
        `Contact name should be within ${
          jnf_text_max_character_count - 1
        } characters.`
      ),
    email: yup
      .string()
      .email("Please enter a email address (eg. sriram@example.com)")
      .required("Required")
      .max(
        jnf_smalltext_max_character_count - 1,
        `Email should be within ${
          jnf_smalltext_max_character_count - 1
        } characters.`
      ),
    mobile: yup
      .number()
      .required("Mobile Number is Required")
      .min(1000000000, "Must be 10 digits")
      .max(9999999999, "Must be 10 digits"),
    telephone: yup.string(),
    isCpiRequired: yup.string().required("Selection is required."),
    cpi: yup
      .number()
      .when("isCpiRequired", {
        is: (value) => value === "yes",
        then: yup
          .number()
          .typeError("CPI must be a number.")
          .min(0, "CPI must be at least 0.")
          .max(10, "CPI must be at most 10.")
          .required("CPI is required when minimum CPI is specified."),
        otherwise: yup.number().notRequired(),
    }), //needs to be checked
  });

  function submit(values) {
    let is_company_details_pdf = compdescription_file.length ? true : false;
    let is_description_pdf = jobdescription_file.length ? true : false;
    let is_compensation_details_pdf = salary_file.length ? true : false;
    let is_selection_procedure_details_pdf = selection_file.length
      ? true
      : false;

    var selectionprocess = values.selectionprocess.slice();
    if (values.selectionprocess.includes("Other")) {
      selectionprocess[values.selectionprocess.indexOf("Other")] =
        values.selectionprocess_other;
    }

    function changeDateFormat(date) {
      let data = date.split("-");
      return data[2] + "-" + data[1] + "-" + data[0];
    }

    var formdata = new FormData();
    formdata.append("company_name", values.name);
    formdata.append("address", values.address);
    formdata.append("company_type", values.type);
    formdata.append("nature_of_business", values.nature);
    formdata.append("type_of_organisation", values.type);
    formdata.append("website", values.link);
    formdata.append("company_details", values.compdescription);
    formdata.append("is_company_details_pdf", is_company_details_pdf);
    formdata.append("contact_person_name", values.contact);
    formdata.append("phone_number", values.mobile);
    formdata.append("email", values.email);
    formdata.append("city", values.city);
    formdata.append("state", values.state);
    formdata.append("country", values.country);
    formdata.append("pincode", values.pincode);
    formdata.append("company_type", values.type);
    formdata.append("designation", values.designation);
    formdata.append("description", values.details);
    formdata.append("is_description_pdf", is_description_pdf);
    formdata.append("job_location", values.locations);
    formdata.append("compensation_ctc", values.ctc);
    formdata.append("company_turnover", values.companyTurnover);//needs to be checked
    formdata.append("compensation_gross", values.gross);
    formdata.append("compensation_take_home", values.takehome);
    formdata.append("compensation_bonus", values.bonus ? values.bonus : 0);
    formdata.append("is_compensation_details_pdf", is_compensation_details_pdf);
    formdata.append("bond_details", values.bonddetails);
    formdata.append(
      "selection_procedure_rounds",
      JSON.stringify(selectionprocess)
    );
    formdata.append("selection_procedure_details", values.selection);
    formdata.append(
      "is_selection_procedure_details_pdf",
      is_selection_procedure_details_pdf
    );
    formdata.append("tentative_date_of_joining", changeDateFormat(values.date));
    formdata.append("establishment_date" , changeDateFormat(values.establishdate));//needs to be checked
    formdata.append("allowed_branch", JSON.stringify(values.branch));
    formdata.append("eligiblestudents", JSON.stringify(values.eligiblestudents));
    formdata.append("pwd_eligible", values.pwdEligibility);//needs to be checked
    formdata.append("backlog_eligible", values.backlogEligibility);//needs to be checked
    formdata.append("pyschometric_test" , values. psychometricTest);//needs to be checked
    formdata.append("medical_test",values.medicalTest);//needs to be checked
    formdata.append(
      "tentative_no_of_offers",
      values.numoffers ? values.numoffers : 0
    );
    formdata.append("expected_no_of_offers", values.expoffers ? values.expoffers : 0);//needs to be checked
    formdata.append("number_of_employees",values.numberOfEmployees ? values.numberOfEmployees : 0);//needs to be checked
    formdata.append("cpi", values.cpi); //needs to be checked
    formdata.append("other_requirements", values.requirements);
    compdescription_file.forEach((file) => {
      formdata.append("company_details_pdf", file, file.name);
    });
    selection_file.forEach((file) => {
      formdata.append("selection_procedure_details_pdf", file, file.name);
    });
    // formdata.append("description_pdf", [values.jobdescription_file]);
    // formdata.append("compensation_details_pdf", [values.salary_file]);
    jobdescription_file.forEach((file) => {
      formdata.append("description_pdf", file, file.name);
    });
    salary_file.forEach((file) => {
      formdata.append("compensation_details_pdf", file, file.name);
    });
    formdata.append("selection_procedure_details_pdf", [values.selection_file]);
    formdata.append("recaptchakey", recaptchaRef.current.getValue());
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };

    setShowLoader(true);

    fetch(API_ENDPOINT + "api/company/addPlacement/", requestOptions)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      return res.json().then((data) => {
        setError(data.message);
        throw new Error(data.message || "Bad Request");
      });
    } else {
      throw new Error("Unexpected response status: " + res.status);
    }
  })
  .then((data) => {
    setSubmitted(1);
    removeData = 1;
    setShowLoader(false);
    // handle success
  })
  .catch((error) => {
    setError(error.message);
    setSubmitted(1);
    setShowLoader(false);
  });



    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(initialValues)
    );
  }

  const handlePageChange = (
    setPage,
    page,
    errors,
    setFieldTouched,
    handleSubmit
  ) => {
    console.log("First time page is changed");
    if (page === 1) {
      if (
        errors.name ||
        errors.link ||
        errors.compdescription ||
        errors.address ||
        errors.city ||
        errors.establishdate ||
        errors.numberOfEmployees ||
        errors.companyTurnover ||
        errors.state ||
        errors.country ||
        errors.pincode ||
        errors.type ||
        errors.nature
      ) {
        setFieldTouched("name", true);
        setFieldTouched("link", true);
        setFieldTouched("compdescription", true);
        setFieldTouched("address", true);
        setFieldTouched("establishdate",true);//needs to be checked
        setFieldTouched("numberOfEmployees",true);//needs to be checked
        setFieldTouched("companyTurnover",true);//needs to be checked
        setFieldTouched("city", true);
        setFieldTouched("state", true);
        setFieldTouched("country", true);
        setFieldTouched("pincode", true);
        setFieldTouched("type", true);
        setFieldTouched("nature", true);
        window.scrollTo(0, 0);
        setWarning("Please fill all the required fields");
      } else {
        setPage(page + 1);
      }
    } else if (page === 2) {
      if (
        errors.designation ||
        errors.locations ||
        errors.details ||
        errors.date ||
        errors.branch ||
        errors.eligiblestudents ||
        errors.pwdEligibility ||
        errors.backlogEligibility ||
        errors.numoffers ||
        errors.expoffers ||
        errors.ctc ||
        errors.gross ||
        errors.takehome ||
        errors.bonus ||
        errors.bonddetails
      ) {
        setFieldTouched("designation", true);
        setFieldTouched("locations", true);
        setFieldTouched("details", true);
        setFieldTouched("date", true);
        setFieldTouched("branch", true);
        setFieldTouched("eligiblestudents", true);
        setFieldTouched("pwdEligibility", true);//needs to be checked
        setFieldTouched("backlogEligibility", true);//needs to be checked
        setFieldTouched("numoffers", true);
        setFieldTouched("expoffers", true);//needs to be checked
        setFieldTouched("ctc", true);
        setFieldTouched("gross", true);
        setFieldTouched("takehome", true);
        setFieldTouched("bonus", true);
        setFieldTouched("bonddetails", true);
        window.scrollTo(0, 0);
        setWarning("Please fill all the required fields");
      } else {
        setPage(page + 1);
      }
    } else if (page === 3) {
      if (
        errors.selectionprocess ||
        errors.psychometricTest ||
        errors.medicalTest ||
        errors.selection ||
        errors.requirements ||
        errors.cpi
      ) {
        setFieldTouched("selection", true);
        setFieldTouched("psychometricTest",true);//needs to be checked
        setFieldTouched("medicalTest",true);//needs to be checked
        setFieldTouched("requirements", true);
        setFieldTouched("selectionprocess", true);
        setFieldTouched("cpi", true); //needs to be checked
        window.scrollTo(0, 0);
        setWarning("Please fill all the required fields");
      } else {
        setPage(page + 1);
      }
    } else if (page === 4) {
      if (errors.contact || errors.email || errors.mobile) {
        setFieldTouched("contact", true);
        setFieldTouched("email", true);
        setFieldTouched("mobile", true);
        window.scrollTo(0, 0);
        setWarning("Please fill all the required fields");
      } else if (termsRef.current.checked === false) {
        setWarning("Please accept the terms and conditions");
        window.scrollTo(0, 0);
      } else if (recaptchaRef.current.getValue() === "") {
        setWarning("Please verify that you are not a robot");
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <HandleBeforeLoad />
      {showComponents && (
        <Container
          className="py-5 d-pink bk-container"
          fluid
          style={{
            backgroundImage:
              "url(/Form_Banner.jpeg), url(/Form_Banner.jpeg), url(/Form_Banner.jpeg)",
          }}
        >
          <Row className="justify-content-center">
            <Col className="l-pink " lg={10} xs={10}>
              {!submitted ? (
                <Formik
                  enableReinitialize={true}
                  validateOnMount={true}
                  validationSchema={schema}
                  isValidating={true}
                  onSubmit={submit}
                  initialValues={preFill ? initialValues : valsFromUseEffect}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    dirty,
                    setFieldValue,
                    setFieldTouched,
                    submitCount,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <AutoSave />

                      <Header />
                      <div
                        style={{
                          marginTop: "60px", // Adjust this value based on the height of your header
                          top: "50px", // This value seems to be intended for positioning, adjust as needed
                          backgroundColor: "#eff7ff",
                        }}
                      >
                        <Row className=" text-center justify-content-center">
                          <h3>Job Notification Form</h3>
                          <h6 style={{ color: "black" }}>{year}</h6>
                        </Row>
                        <MultiStepProgressBar page={page} />
                      </div>
                      {page === 1 ? (
                        <>
                          {" "}
                          <Instructions year={year} updateData={setPreFill} />
                        </>
                      ) : (
                        <></>
                      )}
                      {warning ? (
                        <Alert variant="danger">{warning}</Alert>
                      ) : null}
                      {page === 1 ? (
                        <CompOverview
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                          touched={touched}
                          isValid={isValid}
                          errors={errors}
                          dirty={dirty}
                          setFieldValue={setFieldValue}
                          submitCount={submitCount}
                          compdescription_file={compdescription_file}
                          setCompdescription_file={setCompdescription_file}
                        />
                      ) : (
                        <></>
                      )}
                      {page === 2 ? (
                        <JobProfile
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                          touched={touched}
                          isValid={isValid}
                          errors={errors}
                          dirty={dirty}
                          setFieldValue={setFieldValue}
                          submitCount={submitCount}
                          jobdescription_file={jobdescription_file}
                          setJobdescription_file={setJobdescription_file}
                          salary_file={salary_file}
                          setSalary_file={setSalary_file}
                        />
                      ) : (
                        <></>
                      )}
                      {page === 3 ? (
                        <SelectionProcess
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                          touched={touched}
                          isValid={isValid}
                          errors={errors}
                          dirty={dirty}
                          setFieldValue={setFieldValue}
                          selection_file={selection_file}
                          setSelection_file={setSelection_file}
                        />
                      ) : (
                        <></>
                      )}
                      {page === 4 ? (
                        <>
                          <ContactDetails
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            touched={touched}
                            isValid={isValid}
                            errors={errors}
                            dirty={dirty}
                          />
                          <Col>
                            <Form.Check
                              required
                              style={{ display: "inline" }}
                              ref={termsRef}
                            />
                            <span
                              style={{ display: "inline", paddingLeft: "10px" }}
                            >
                              We have read and understood the{" "}
                              <a href="https://drive.google.com/file/d/12hiRifBpIZUrZRJNXTqwcZb9ge_QbO4K/view">
                                rules and regulations
                              </a>{" "}
                              put forth by the IIT Dharwad Career Development
                              Cell
                            </span>
                          </Col>
                          <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                            size="normal"
                            ref={recaptchaRef}
                            style={{ marginTop: "20px", height: "50px" }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      <hr className="pd" />
                      <Row>
                        {page !== 1 ? (
                          <Col className="text-start">
                            <Button
                              variant="primary"
                              style={{
                                backgroundColor: "#ff7350",
                                borderColor: "#ff7350",
                              }}
                              onClick={() => {
                                setPage(page - 1);
                              }}
                            >
                              Back
                            </Button>
                          </Col>
                        ) : (
                          <></>
                        )}
                        {page !== 4 ? (
                          <Col className="text-end">
                            <Button
                              variant="primary"
                              style={{
                                backgroundColor: "#ff7350",
                                borderColor: "#ff7350",
                              }}
                              onClick={() =>
                                handlePageChange(
                                  setPage,
                                  page,
                                  errors,
                                  setFieldTouched,
                                  handleSubmit
                                )
                              }
                            >
                              Next
                            </Button>
                          </Col>
                        ) : (
                          <Col className="text-end">
                            <Button
                              variant="primary"
                              onClick={() =>
                                handlePageChange(
                                  setPage,
                                  page,
                                  errors,
                                  setFieldTouched,
                                  handleSubmit
                                )
                              }
                            >
                              Submit
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </Form>
                  )}
                </Formik>
              ) : (
                <>
             
                {error ? (
  <>
    <h3 className="text-center">Submission Failed</h3>
    <p className="text-center"  style={{ color: 'red' }}>
      <b>Error: {error}</b>
    </p>
    <p className="text-center">
      Please check the provided information and try again. If the issue persists, contact support.
    </p>
  </>
) : (
  <>
    <h3 className="text-center">Submitted Successfully!</h3>
    <p className="text-center">
      <b>
        To finish this process, please check your inbox for our verification email. 
        Verify your email within 24 hours of the submission to complete this process.
      </b>
    </p>
  </>
)}

                </>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default JNF;
