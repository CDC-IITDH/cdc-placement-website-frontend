import { useEffect, useState } from "react"
import API_ENDPOINT from "../../../api/api_endpoint"
import { Row, Col} from "react-bootstrap"
import logo from "../../images/cdc_logo.png";
import {Link} from "react-router-dom";

const VerifyEmail = ({setShowLoader,setError}) => {
    const token = new URLSearchParams(window.location.search).get("token")
    console.log(token)
    const [ res , setRes ] = useState(null)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: 
            JSON.stringify({
            "token": token
        }),
        redirect: 'follow'
        };
        
        useEffect(() => {
            fetch(API_ENDPOINT+"api/company/verifyEmail/", requestOptions)
            .then(response =>()=>{
                return response.status})
            .then(result => {
                setRes(result)
                setShowLoader(false)
            })
            .catch(error => {
                console.log('error', error);
                setError(error)
                setRes(500)
                setShowLoader(false)
            });
        }, [])
        
    return (
        <div className="container-fluid p-0">
            <nav className=" d-flex justify-content-center" style={{
                width: "100%",
                backgroundColor: "#334878",
    background: 'linear-gradient(90deg, rgba(51, 72, 120, 1) 25%, rgba(65, 93, 156, 1) 100%)'}}>
        <Link to='\' >
            <img style={{width: "300px", margin: "auto",padding:"0.5cm"}}  src={logo} alt='cdc-logo'/>
        </Link>
            </nav>
            <Row className="justify-content-center g-0">
                <Col className=" p-5 text-center" lg={7} xs={11} >
                {res === 200 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-check2-circle text-success" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                    </svg>
                ) : (  
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-exclamation-triangle text-danger align-center justify-content-center" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                    </svg>
                    )}
                
                    <h1 className="text-center text-dark">
                        {res === 200 && "Email verified successfully.Check your mail for more details"}
                        {res === 400 && "URL is not valid"}
                        {res === 404 && " Some Error Occurred, Email not verified"}
                        {res === 500 && "Server Error Occurred, Email not verified"}
                    </h1>
                    <p className="text-center text-dark">
                        {res === 200 && "Check email for further details"}
                        {res === 400 && "Check the URL and try again"}
                        {res === 404 && "Contact CDC if problem persists"}
                        {res === 500 && "Please, try again after sometime. Contact CDC if problem persists"}
                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default VerifyEmail;