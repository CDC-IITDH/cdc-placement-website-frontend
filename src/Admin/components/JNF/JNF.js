import { Form, Button, Col, Container, Row } from "react-bootstrap";
import "./form.css"
import CompOverview from "./CompOverview";
import { Formik } from "formik"
import * as yup from 'yup'
import Instructions from "./Instructions";
import { useState } from "react";
import JobProfile from "./JobProfile";
import SalaryDetails from "./SalaryDetails";
import SelectionProcess from "./SelectionProcess"
import ContactDetails from "./ContactDetails";

const JNF = (setShowLoader) => {
    const year = "2020-2021"

    const [page, setPage] = useState(1)

    let schema = yup.object().shape({
      name: yup.string().required('Company Name is Required'),
      link: yup.string().url('Please enter a valid url (eg. https://example.com)').required('Website Link is Required'),
      address: yup.string().required('Company Address is Required'),
      city: yup.string().required('City is Required'),
      state: yup.string().required('State is Required'),
      country: yup.string().required('Country is Required'),
      pincode: yup.string().required('Zip/Pin is Required'),
      type: yup.array().min(1,'Choose at least one'),
      nature: yup.array().min(1,'Choose at least one'),
      designation: yup.string().required('Designation is Required'),
      locations: yup.string().required('Loaction is Required'),
      details: yup.string().required('Details are Required'),
      date: yup.string().required('Date is Required'),
      numoffers: yup.number(),
      ctc: yup.number().required('CTC is Required'),
      gross: yup.number().required('Gross is Required'),
      takehome: yup.number().required('Take Home is Required'),
      bonus: yup.number(),
      selectionprocess: yup.array().min(1,'Choose at least one'),
      contact: yup.string().required('Contact is Required'),
      email: yup.string().email('Please enter a email address (eg. john@example.com)'),
      mobile: yup.number().required('Mobile Number is Required'),
      telephone: yup.string()
    })

    function submit(values) {
      console.log('hi')
    }

    return (
      <>
        <Container className="py-5 d-pink bk-container" fluid style={{backgroundImage: "url(/Form_Banner.jpeg), url(/Form_Banner.jpeg), url(/Form_Banner.jpeg)"}}>
          <Row className="justify-content-center">
            <Col className="l-pink p-5" lg={7} xs={11}>
              <Formik validationSchema={schema} onSubmit={submit} initialValues={{}}>
                {({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, dirty}) => (
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
                      ):(<></>)}
                      {(page===5)? (
                        <Col className="text-end">
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Col>
                      ):(<></>)}
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