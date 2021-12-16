import { Form, Button, Col, Container, Row } from "react-bootstrap";
import "./form.css"
import CompOverview from "./CompOverview";
import { Formik } from "formik"
import * as yup from 'yup'
import Instructions from "./Instructions";
import { useState, useEffect } from "react";
import JobProfile from "./JobProfile";
import SalaryDetails from "./SalaryDetails";
import SelectionProcess from "./SelectionProcess"
import ContactDetails from "./ContactDetails";
import API_ENDPOINT from "../../../api/api_endpoint";

const JNF = ({setShowLoader}) => {
    const year = "2020-2021"

    const [page, setPage] = useState(1)
    const [submitted, setSubmitted] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
      setShowLoader(false)
    }, [])

    useEffect(() => {
      window.scrollTo(0,0)
    }, [page])

    const validatePDF = (value, context) => {
      if (value) {
        return (value.type === 'application/pdf')
      }
      else {
        return true
      }
    }

    const validateSize = (value, context) => {
      if (value) {
        // console.log(value.size);
        // console.log(value);
        return (value.size <= 10000000)
      }
      else {
        return true
      }
    }

    let schema = yup.object().shape({
      name: yup.string().required('Company Name is Required'),
      link: yup.string().url('Please enter a valid url (eg. https://example.com)').required('Website Link is Required'),
      compdescription_file: yup.mixed().test('pdf-check','Must be PDF',validatePDF).test('size-check','Must be smaller than 10MB',validateSize),
      jobdescription_file: yup.mixed().test('pdf-check','Must be PDF',validatePDF).test('size-check','Must be smaller than 10MB',validateSize),
      salary_file: yup.mixed().test('pdf-check','Must be PDF',validatePDF).test('size-check','Must be smaller than 10MB',validateSize),
      selection_file: yup.mixed().test('pdf-check','Must be PDF',validatePDF).test('size-check','Must be smaller than 10MB',validateSize),
      address: yup.string().required('Company Address is Required'),
      city: yup.string().required('City is Required'),
      state: yup.string().required('State is Required'),
      country: yup.string().required('Country is Required'),
      pincode: yup.number().required('Zip/Pin is Required'),
      type: yup.string().required("Required"),
      nature: yup.string().required("Required"),
      designation: yup.string().required('Designation is Required'),
      locations: yup.string().required('Loaction is Required'),
      details: yup.string().required('Details are Required'),
      date: yup.string().required('Date is Required'),
      branch: yup.array().min(1,'Choose at least one').required("Required"),
      research: yup.string().required("Required"),
      numoffers: yup.number(),
      ctc: yup.number().required('CTC is Required'),
      gross: yup.number().required('Gross is Required'),
      takehome: yup.number().required('Take Home is Required'),
      bonus: yup.number(),
      selectionprocess: yup.array().min(1,'Choose at least one').required("Required"),
      contact: yup.string().required('Contact is Required'),
      email: yup.string().email('Please enter a email address (eg. john@example.com)').required("Required"),
      mobile: yup.number().required('Mobile Number is Required'),
      telephone: yup.string()
    })

    function submit(values) {
      let is_company_details_pdf=(values.compdescription_file)?true:false
      let is_description_pdf=(values.jobdescription_file)?true:false
      let is_compensation_details_pdf=(values.salary_file)?true:false
      let is_selection_procedure_details_pdf=(values.selection_file)?true:false

      var selectionprocess=values.selectionprocess.slice()
      if (values.selectionprocess.includes("Other")) {
        selectionprocess[values.selectionprocess.indexOf("Other")]=values.selectionprocess_other
      }

      function changeDateFormat(date) {
        let data = date.split('-')
        return data[2]+"-"+data[1]+"-"+data[0]
      }

      var formdata = new FormData();
      formdata.append("company_name", values.name);
      formdata.append("address", values.address);
      formdata.append("company_type", JSON.stringify(values.type));
      formdata.append("nature_of_business", JSON.stringify(values.nature));
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
      formdata.append("designation", values.designation);
      formdata.append("description", values.details);
      formdata.append("is_description_pdf", is_description_pdf);
      formdata.append("compensation_ctc", values.ctc);
      formdata.append("compensation_gross", values.gross);
      formdata.append("compensation_take_home", values.takehome);
      formdata.append("compensation_bonus", (values.bonus?values.bonus:0));
      formdata.append("compensation_details", "");
      formdata.append("is_compensation_details_pdf", is_compensation_details_pdf);
      formdata.append("bond_details", values.bonddetails);
      formdata.append("selection_procedure_rounds", JSON.stringify(selectionprocess));
      formdata.append("selection_procedure_details", values.selection);
      formdata.append("is_selection_procedure_details_pdf", is_selection_procedure_details_pdf);
      formdata.append("tentative_date_of_joining", changeDateFormat(values.date));
      formdata.append("allowed_branch", JSON.stringify(values.branch));
      formdata.append("tentative_no_of_offers", (values.numoffers?values.numoffers:0));
      formdata.append("other_requirements", values.requirements);
      formdata.append("company_details_pdf", [values.compdescription_file]);
      formdata.append("description_pdf", [values.jobdescription_file]);
      formdata.append("compensation_details_pdf", [values.salary_file]);
      formdata.append("selection_procedure_details_pdf", [values.selection_file]);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      // console.log(values.date)

      fetch(API_ENDPOINT+"api/company/addPlacement/", requestOptions)
        .then(res => {
          if (res.status !== 200) {
            setError(res)
          }
          setSubmitted(1)
        })
        .catch(error => {
          setError(error)
        });
    }

    return (
      <>
        <Container className="py-5 d-pink bk-container" fluid style={{backgroundImage: "url(/Form_Banner.jpeg), url(/Form_Banner.jpeg), url(/Form_Banner.jpeg)"}}>
          <Row className="justify-content-center">
            <Col className="l-pink p-5" lg={7} xs={11}>
              {!submitted? (
                <Formik validationSchema={schema} onSubmit={submit} initialValues={{name:'',link:'',address:'',city:'',state:'',country:'',pincode:'',type:'',nature:'',designation:'',locations:'',details:'',date:'',numoffers:'',ctc:'',gross:'',takehome:'',bonus:'',selectionprocess:'',contact:'',email:'',mobile:'',telephone:'',compdescription:'',bonddetails:'',requirements:'',selection:'',compdescription_file:'',jobdescription_file:'',salary_file:'',selection_file:'',branch:'',research:'',selectionprocess_other:''}}>
                  {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty,setFieldValue,submitCount}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      {(page === 1) ? (
                        <Instructions year={year} />
                      ):(<></>)}
                      {(page === 1) ? (
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
                        />
                      ):(<></>)}
                      {(page === 2) ? (
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
                        />
                      ):(<></>)}
                      {(page === 3) ? (
                        <SalaryDetails
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                          touched={touched}
                          isValid={isValid}
                          errors={errors}
                          dirty={dirty}
                          setFieldValue={setFieldValue}
                        />
                      ):(<></>)}
                      {(page === 4) ? (
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
                        />
                      ):(<></>)}
                      {(page === 5) ? (
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
                      ):(<></>)}
                      <hr className="pd" />
                      <Row>
                        {(page!==1)? (
                          <Col className="text-start">
                            <Button variant="primary" onClick={()=>{setPage(page-1)}}>
                              Back
                            </Button>
                          </Col>
                        ):(<></>)}
                        {(page!==5)? (
                          <Col className="text-end">
                            <Button variant="primary" onClick={()=>{setPage(page+1)}}>
                              Next
                            </Button>
                          </Col>
                        ):(
                          <Col className="text-end">
                            <Button variant="primary" onClick={handleSubmit} disabled={!(isValid && dirty)}>
                              Submit
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </Form>
                  )}
                </Formik>
              ):(
                <>
                {error? (
                  <>
                    <h3 className="text-center">Something went wrong!</h3>
                    <p className="text-center">We're really sorry, please try to fill the form again some other time.</p>
                  </>
                ):(
                  <>
                    <h3 className="text-center">Submitted Successfully!</h3>
                    <p className="text-center">We've sent an email to verify your email ID.</p>
                  </>
                )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
};

export default JNF