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
var axios = require('axios');

const JNF = ({setShowLoader}) => {
    const year = "2020-2021"

    const [page, setPage] = useState(1)

    useEffect(() => {
      setShowLoader(false)
    }, [])

    useEffect(() => {
      window.scrollTo(0,0)
    }, [page])

    let schema = yup.object().shape({
      name: yup.string().required('Company Name is Required'),
      link: yup.string().url('Please enter a valid url (eg. https://example.com)').required('Website Link is Required'),
      address: yup.string().required('Company Address is Required'),
      city: yup.string().required('City is Required'),
      state: yup.string().required('State is Required'),
      country: yup.string().required('Country is Required'),
      pincode: yup.string().required('Zip/Pin is Required'),
      type: yup.array().min(1,'Choose at least one').required("Required"),
      nature: yup.array().min(1,'Choose at least one').required("Required"),
      designation: yup.string().required('Designation is Required'),
      locations: yup.string().required('Loaction is Required'),
      details: yup.string().required('Details are Required'),
      date: yup.string().required('Date is Required'),
      research: yup.string().required("Required"),
      numoffers: yup.number(),
      ctc: yup.number().required('CTC is Required'),
      gross: yup.number().required('Gross is Required'),
      takehome: yup.number().required('Take Home is Required'),
      bonus: yup.number(),
      selectionprocess: yup.array().min(1,'Choose at least one').required("Required"),
      contact: yup.string().required('Contact is Required'),
      email: yup.string().email('Please enter a email address (eg. john@example.com)'),
      mobile: yup.number().required('Mobile Number is Required'),
      telephone: yup.string()
    })

    function submit(values) {
      console.log(values)
      let data = {
        company_name: values.name,
        address: values.address,
        company_type: values.type,
        nature_of_business: values.nature,
        website: values.link,
        company_details: values.compdescription,
        is_company_details_pdf: '',
        contact_person_name: values.contact,
        phone_number: values.mobile,
        email: values.email,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,
        designation: values.designation,
        description: values.details,
        is_description_pdf: '',
        compensation_ctc: values.ctc,
        compensation_gross: values.gross,
        compensation_take_home: values.takehome,
        compensation_bonus: values.bonus,
        compensation_details: '',
        is_compensation_details_pdf: '',
        bond_details: values.bonddetails,
        selection_procedure_rounds: values.selectionprocess,
        selection_procedure_details: values.selection,
        is_selection_procedure_details_pdf: '',
        tentative_date_of_joining: values.date,
        allowed_branch: '',
        tentative_no_of_offers: values.numoffers,
        other_requirements: values.requirements,
        company_details_pdf: values.compdescription_file,
        description_pdf: values.jobdescription_file,
        compensation_details_pdf: values.salary_file,
        selection_procedure_details_pdf: values.selection_file,
      }
      console.log(data)
    }

    return (
      <>
        <Container className="py-5 d-pink bk-container" fluid style={{backgroundImage: "url(/Form_Banner.jpeg), url(/Form_Banner.jpeg), url(/Form_Banner.jpeg)"}}>
          <Row className="justify-content-center">
            <Col className="l-pink p-5" lg={7} xs={11}>
              <Formik validationSchema={schema} onSubmit={submit} initialValues={{name:'',link:'',address:'',city:'',state:'',country:'',pincode:'',type:'',nature:'',designation:'',locations:'',details:'',date:'',numoffers:'',ctc:'',gross:'',takehome:'',bonus:'',selectionprocess:'',contact:'',email:'',mobile:'',telephone:'',compdescription:'',bonddetails:'',requirements:'',selection:''}}>
                {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty,setFieldValue}) => (
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
                          <Button variant="primary" onClick={handleSubmit}>
                            Submit
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </>
    )
};

export default JNF