
# Contents of JNF table

## 1. Frontend Validation

### a. Company Overview

| Attribute       | Description of the Attribute |  Component type used for rendering    | Validaton |
| :---        |    :----:   |   :---:  |  ---:  |
| Comany name      | type : text <br> name : 'name'  | Form.Group, Form.Label, Form.Control, Form.Control.Feedback   | <span style="color : red">required field</span> <br>  maxLength = 50 |
| Website Link | type : text <br> name : 'link' |  Form.Group, Form.Label, Form.Control, Form.Control.Feedback | <span style="color : red">required field</span> <br>  maxLength = 100 | 
|Brief About the Company (as file)| type : file <br> name : "compdescription_file" | MultipleFileInput | PDF max size : 10MB |
|Brief about the company (describe in words)| type : text-area <br> name : "compdescription" | Form.Group, Form.Label, Form.Control | maxLength = 1000 |
| Company Address | type : text-area <br> name : 'address' | Form.Group, Form.Label, Form.Control, Form.Control.Label | <span style="color : red">required field</span> <br> maxLength : 1000 |
| City | type : text <br> name : 'city' |  Form.Group, Form.Label, Form.Control, Form.Control.Label | <span style="color : red">required field</span> <br> maxLength : 50 |
| State | type : text <br> name : 'state' | Form.Group, Form.Label, Form.Control, Form.Control.Label | <span style="color : red">required field</span> <br> maxLength : 50 |
| Country | type : text <br> name : 'Country' | Form.Group, Form.Label, Form.Control, Form.Control.Label | <span style="color : red">required field</span> <br> maxLength : 50 |
| Zip/Pin | type : number <br> name : 'pincode' | Form.Group, Form.Label, Form.Control, Form.Control.Label | <span style="color : red">required field</span> <br> maxLength : 50 |
| Type of Organization | type : radio <br> name : 'type' | Form.Group, Form.Check, Form.Check.Input, Form.Check.Label, Row, Col | <span style="color : red">required field</span> |
| Nature of Business | type : radio <br> name : 'nature' | Form.Group, Form.Check, Form.Check.Input, Form.Check.Label, Row, Col | <span style="color : red">required field</span> |

### b. Job Profile

| Attribute       | Description of the Attribute |  Component type used for rendering    | Validaton |
| :---        |    :----:   |   :---:  |  ---:  |
| Job Description | type : file <br> name : 'jobdescription_file'| MultipleFileInput | PDF max size : 10MB | 
| Job Designation Offered | type : text <br> name : 'designation' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback | <span style="color : red">required field</span> <br> maxLength : 100 |
| Location(s) of the job | type : text <br> name : 'locations' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback | <span style="color : red">required field</span> <br> maxLength : 50 |
| Job Details | type : text_area <br> name : 'details' | Form.Group, Form.Label, Form.Control, Form.text, Form.Control.Feedback | <span style="color : red">required field</span> <br> maxLength : 1000 |
| Tentative Date of Joining | type : date <br> name : 'date' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback | <span style="color : red">required field</span> <br>  | 
| Eligible Branches | type : checkbox <br> name : 'branch'| Form.Group, Form.Label, Form.Check, Row, Form.Check.Input, Form.Check.Label | <span style="color : red">required field</span> <br> choose atleast one |
| Are MS research scholars (postgraduates) eligible to apply? | type : radio <br> name : 'research' | Form.Group, Form.Label, Form.Check, Form.Check.Input, Form.Check.Label, Col, Row | <span style="color : red">required field</span> |
| Tentative Number of Offers | type : number <br> name : 'numoffers' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback, Form.Text | must be positive | 
| Salary Description | type : file <br> name : 'salary_file' | MultipleFileInput | PDF max size : 10MB |
| Cost to Company (CTC) | type : number <br> name : 'ctc' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback, Form.Text | <span style="color : red">required field</span> <br> must be positive
| Gross | type : number <br> name : 'gross' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback, Form.Text |  <span style="color : red">required field</span> <br> must be positive |
| Take Home | type : number <br> name : 'takehome' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback, Form.Text | <span style="color : red">required field</span> <br> must be positive |
| Bonus/Incentives (if any) | type : number <br> name : 'bonus' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback, Form.Text | must be postive |
| Details of Bond (if any) | type : text_area <br> name : 'bonddetails' | Form.Group, Form.Label, Form.Control | maxLength : 1000 |

### c. Selection Process

| Attribute       | Description of the Attribute |  Component type used for rendering    | Validaton |
| :---        |    :----:   |   :---:  |  ---:  |
| Tentative selection Process | type : "checkbox" <br> name : 'selectionprocess' | Form.Group, Form.Label, Form.Check, Row, Col, Form.Check.Input, Form.Check.Label | <span style="color : red">required field</span> <br> choose atleast one |
| Breifly explain the selection procedure (attach details) | type : file <br> name : 'selction_file' | MultipleFileInput | PDF max size : 10MB |
| or Describe the Selection Procedure | type : textaread <br> name : 'selection' | Form.Group, Form.Label, Form.Control | maxLength : 1000 |
| Academic Requirements | type : textarea <br> name : 'requirements' | Form.Group, Form.Label, Form.Control, Form.Text | maxLength : 1000

### d. Company Contact Details
| Attribute       | Description of the Attribute |  Component type used for rendering    | Validaton |
| :---        |    :----:   |   :---:  |  ---:  |
| Contact Person | type : text <br> name : 'contact'| Form.Group, Form.Label, Form.Control, Form.Control.Feedback | <span style="color : red">required field</span> <br> maxLength : 100 | 
| Email | type : text <br> name : 'email' | Form.Group, Form.Label, Form.Control, Form.Control.Feedback | <span style="color : red">required field</span> <br> maxLength : 50 | 
| Mobile | type : number <br> name : "moblie" | Form.Group, Form.Label, Form.Control, Form.Control.Feedback | <span style="color : red">required field </span> | 


## 2. JSON Object
Request URL : http://localhost:8000/api/company/addPlacement/
Request method : POST
Request Body: 

```json 
{
    "company_name" : "Google",
    "address" : "Banglore", 
    "company_type" : "MNC (Foreign Origin)",
    "nature_of_business" : "Core (Technical)",
    "type_of_organisation": "MNC (Foreign Origin)",
    "website" : "https://about.google/",
    "company_details" : "Hi there",
    "is_company_details_pdf" : false,
    "contact_person_name" : "John",
    "phone_number" : 7705475671,
    "email" : "xyz@gmail.com",
    "city" : "Banglore",
    "state" : "Karnataka",
    "country" : "India",
    "pincode" : 580023,
    "company_type" : "MNS (Foreign Origin)",
    "designation" : "SDE, Data Scientist",
    "description" : "Hello World",
    "is_description_pdf" : false,
    "job_location" : "Banglore, Karnataka, India",
    "compensation_ctc" : 4000000,
    "compensation_gross" : 4000000,
    "compensation_take_home" : 4000000,
    "compensation_bonus" : 0,
    "is_compensation_details_pdf" : false,
    "bond_details" : "",
    "selection_procedure_rounds" : ["Aptitude Test","Resume Shortlisting","Technical Test","Technical Interview","HR Interview"],
    "selection_procedure_details" : "faf",
    "is_selection_procedure_details_pdf" : false,
    "tentative_date_of_joining" : 29-10-2022,
    "allowed_branch" : ["MMAE","EE","CSE"],
    "rs_eligible" : "Yes",
    "tentative_no_of_offers" : 2,
    "other_requirements" : "7+ CPI, No Backlogs",
    "selection_procedure_details_pdf" : ,
    "recaptchakey" : "03AIIukzhz78Wsgf79YryYud5e6Lq3U5aqBvV7U2La4wU4vH9htCqIF8c1cEbFtwFMkqL67J7dP-PjtJLBpLNqIhUiP8zb9KJkudApAIJca9DcqN9qVC3AmW5zd3MUX0xzHYgdn4jWxix5JOuxjx43px4S8DKvHRtzIaYc8VH3arehEMVKldZZ9u8k56hGrufMwDn7dxMXaB3ALR1GCvMNN5PmDkk8gFCChYrleyTqMdb6LNiUXl8k3x2luCtrmsQs7J9co6fsprK-Qj4sNJ7BfinwEzu2kT7dgTOP2Qs4RtT-a39K1GMcak0s_P8mmIOThUMZlSTgWIN49DuakFWltbeZOQfkiJZqA_NmqOz7VNtV6LwqYBnWLoiNw-C6ay0kgvcp1Hr5zBkQjzA7UI6sg2Gt4BSrTTeRVh6iJcheFHCXLMxhulpUUYbUI_BlERGOliTODepwzd18NMcgMMeGiIrdS2Fy0SD-piKhNzTYvSS0dChB2s91NzZBRTtU_Hxr7AMJ7-WuNs24"
}
```