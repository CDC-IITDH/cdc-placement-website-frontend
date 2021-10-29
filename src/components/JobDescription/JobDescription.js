import React from 'react';
import { Divider, Stepper, Step, StepLabel, Paper, Button } from '@material-ui/core';

import './JobDescription.css';

const jobDescription = () => {

    const rounds = [            // to be fetched from backend
        {
            label: 'Accepting Applications'
        },
        {
            label: 'Resume Shortlisting',
            description: 'Resume will be seen'
        },
        {
            label: 'Technical Test',
            description: 'Online Technical Test which will be monitored remotely'
        },
        {
            label: 'Interview',
            description: 'One to one Interview'
        },
        {
            label: 'Completed'
        }
    ];

    const description = "\n\n\n\n\n";     // to be fetched from backend
    const date = "2022-01-01";            // to be fetched from backend 

    return (
        <div className="Description">
            <h2>Company Name</h2>
            <h6>Job Designation</h6>
            <h6 style={{ marginBottom: '1rem' }}><strong>Company Address</strong></h6>
            <pre className="pre">City { "\t\t\t\t" } State</pre>
            <pre className="pre">Country { "\t\t\t\t" } Pin</pre>
            <a href="#" className="a">Website Link</a>
            <br/> <br/>
            <Divider className="h-2"/>
            <br/>
            <h6>Type of Organization</h6>
            <p style={{ marginBottom: '1rem' }}>Nature of Business</p>
            <div className="center-space">
                <div>
                    <pre className="pre between" style={{ marginBottom: '0.7rem' }}><strong>Job Description:</strong><strong><a href="#" className="a">Download PDF</a></strong></pre>
                    <h6>Job Details</h6>
                    <br/> <br/>
                    <pre className="pre between" style={{ marginBottom: '0.7rem' }}><strong>Rounds:</strong><strong><a href="#" className="a">Download PDF</a></strong></pre>
                    <Stepper activeStep={-1} orientation="vertical">
                        {rounds.map((round, index) => (
                            <Step key={index}>
                                <StepLabel>
                                    {round.label}<br/>{round.description}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div className="center-text">
                        <Divider className="h-2"/>
                        <Paper elevation={0} className="paper">
                            <h4><strong>Brief about the Company</strong></h4>
                            <pre className="pre">{description}</pre>
                            <strong><a href="#" className="a">Download PDF</a></strong>
                        </Paper>
                    </div>
                    <br/>
                    <Paper elevation={0} className="paper">
                        <h6>Contact Person Name</h6>
                        <h6>Email</h6>
                        <h6>Mobile Number</h6>
                        <h6>Designation</h6>
                    </Paper>
                </div>
                <br/> <br/>
                <div className="mt-0">
                    <Paper elevation={0} className="paper mt-0">
                        <h6>Tentative date of joining</h6>
                        <h6><strong>{date}</strong></h6>
                        <br/>
                        <Divider className="h-2-full pad-2"/>
                        <br/>
                        <h6>Salary Desc PDF - Optional</h6>
                        <h6><strong>CTC</strong></h6>
                        <h6 style={{ marginBottom: '1rem' }}><strong>Gross</strong></h6>
                        <pre className="pre between" style={{ marginBottom: '0.3rem' }}><strong>Take Home</strong><strong><a href="#" className="a">Download PDF</a></strong></pre>
                        <h6><strong>Bonus</strong></h6>
                        <h6><strong>Bond Details</strong></h6>
                        <br/>
                        <Divider className="h-2-full pad-2"/>
                        <br/>
                        <h6>Location | Location Type</h6>
                        <h6><strong>Singapore | International</strong></h6>
                        <br/>
                        <Divider className="h-2-full pad-2"/>
                        <br/>
                        <h6>Status</h6>
                        <h6><strong>Location of Job</strong></h6>
                        <br/>
                        <Divider className="h-2-full pad-2"/>
                        <br/>
                        <h6>Allowed Branch</h6>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button className="UserType-btn">CSE</Button>
                            <Button className="UserType-btn">EE</Button>
                            <Button className="UserType-btn">ME</Button>
                        </div>
                        <br/>
                        <Divider className="h-2-full pad-2"/>
                        <br/>
                        <h6>Allowed Batch</h6>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button className="UserType-btn">2018</Button>
                            <Button className="UserType-btn">2019</Button>
                            <Button className="UserType-btn">MS Scholars</Button>
                        </div>
                        <br/>
                        <Divider className="h-2-full pad-2"/>
                        <br/>
                        <h6>Any academia requirements for students</h6>
                        <h6><strong>CPI, Prerequisites</strong></h6>
                        <br/>
                        <Divider className="h-2-full pad-2"/>
                        <br/>
                        <h6>Tentative number of offers</h6>
                        <h6><strong>5</strong></h6>
                        <br/>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default jobDescription;
