import { rest } from "msw";
import API_ENDPOINT from "../../../api/api_endpoint";

const newCompanies = [{
    id: "wBHiw1XxWY5eY6y",
    company_details_pdf_links: [{
        link: "http://localhost/storage/Company_Attachments/wBHiw1XxWY5eY6y/a7QbNUhMCNYlnOj_Rohit%20Gour.pdf",
        name: "a7QbNUhMCNYlnOj_Rohit Gour.pdf",
    }, ],
    description_pdf_links: [{
        link: "http://localhost/storage/Company_Attachments/wBHiw1XxWY5eY6y/HkW80KG5MD0EgYd_Rohit%20Gour.pdf",
        name: "HkW80KG5MD0EgYd_Rohit Gour.pdf",
    }, ],
    compensation_pdf_links: [{
        link: "http://localhost/storage/Company_Attachments/wBHiw1XxWY5eY6y/duYdFqqVT0NRGQa_Rohit%20Gour.pdf",
        name: "duYdFqqVT0NRGQa_Rohit Gour.pdf",
    }, ],
    selection_procedure_details_pdf_links: [{
        link: "http://localhost/storage/Company_Attachments/wBHiw1XxWY5eY6y/HUj8xxUjepQcNyQ_Rohit%20Gour.pdf",
        name: "HUj8xxUjepQcNyQ_Rohit Gour.pdf",
    }, ],
    company_name: "Amazon",
    address: "26/1, Brigade World Trade Centre, 10th Floor,Dr. Raj Kumar Road, Malleshwaram (W) BANGALORE, Bangalore, INDIA 560055.",
    company_type: "MNC (Foreign Origin)",
    nature_of_business: "I.T./ITeS",
    type_of_organisation: "MNC (Foreign Origin)",
    website: "https://www.amazon.in/",
    company_details: "Amazon’s “Day 1” mentality is our approach of doing everything with the energy and entrepreneurial spirit of a new organization on its first day.",
    is_company_details_pdf: true,
    contact_person_name: "Gowtham",
    phone_number: 7566816191,
    email: "190010036@iitdh.ac.in",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pin_code: 560055,
    city_type: "Domestic",
    designation: "SDE",
    description: "· Collaborate with experienced cross-disciplinary Amazonians to conceive, design, and bring innovative products and services to market.· Design and build innovative technologies in a large distributed computing environment and help lead fundamental changes in the industry.· Create solutions to run predictions on distributed systems with exposure to innovative technologies at incredible scale and speed.· Build distributed storage, index, and query systems that are scalable, fault-tolerant, low cost, and easy to manage/use.· Design and code the right solutions starting with broadly defined problems.· Work in an agile environment to deliver high-quality software.",
    job_location: "bangalore",
    is_description_pdf: true,
    compensation_CTC: 4000000,
    compensation_gross: 5000000,
    compensation_take_home: 3500000,
    compensation_bonus: 100000,
    is_compensation_details_pdf: true,
    bond_details: "1 Year of Bond",
    selection_procedure_rounds: [
        "Resume Shortlisting",
        "Technical Test",
        "Aptitude Test",
        "Pre-Placement Test",
        "Technical Interview",
        "HR Interview",
    ],
    selection_procedure_details: "Written Round    Online Coding Round    Multiple Technical Rounds    Hiring Manager Round    HR Round",
    is_selection_procedure_details_pdf: true,
    tier: "1",
    tentative_date_of_joining: "2022-06-15",
    allowed_batch: ["2019"],
    allowed_branch: ["EE", "ME", "CSE"],
    tentative_no_of_offers: 5,
    rs_eligible: true,
    other_requirements: "CPI greater than 6.5",
    additional_info: [],
    email_verified: true,
    offer_accepted: null,
    deadline_datetime: "2022-06-08T15:09:57+05:30",
    created_at: "2022-06-06T15:09:58+05:30",
    updated_at: "2022-06-06T16:00:37.351512+05:30",
}, ];

const ongoingCompanies = [{
    id: "oyY5OiMqFjW0Ind",
    company_details_pdf_links: [{
        link: "http://localhost/storage/Company_Attachments/oyY5OiMqFjW0Ind/VQQPq5dtAQwcaWq_Profile%20%281%29.pdf",
        name: "VQQPq5dtAQwcaWq_Profile (1).pdf",
    }, ],
    description_pdf_links: [{
        link: "http://localhost/storage/Company_Attachments/oyY5OiMqFjW0Ind/e4VWfQW1Y9TSdKc_Rohit%20Gour.pdf",
        name: "e4VWfQW1Y9TSdKc_Rohit Gour.pdf",
    }, ],
    compensation_pdf_links: [{
        link: "http://localhost/storage/Company_Attachments/oyY5OiMqFjW0Ind/0dO6g5Rgmn3Q9Z8_Rohit%20Gour.pdf",
        name: "0dO6g5Rgmn3Q9Z8_Rohit Gour.pdf",
    }, ],
    selection_procedure_details_pdf_links: [{
            link: "http://localhost/storage/Company_Attachments/oyY5OiMqFjW0Ind/wwxnNuGVj3R1t6M_Rohit%20Gour.pdf",
            name: "wwxnNuGVj3R1t6M_Rohit Gour.pdf",
        },
        {
            link: "http://localhost/storage/Company_Attachments/oyY5OiMqFjW0Ind/5HHbkavTxEN5GAu_Profile%20%281%29.pdf",
            name: "5HHbkavTxEN5GAu_Profile (1).pdf",
        },
    ],
    company_name: "Microsoft",
    address: "1101 – 1106, Earth Arise, 11th Floor, Sarkhej – Gandhinagar Highway, Makarba, Ahmedabad – 380015. Bangalore",
    company_type: "MNC (Foreign Origin)",
    nature_of_business: "I.T./ITeS",
    type_of_organisation: "MNC (Foreign Origin)",
    website: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
    company_details: "Our mission is to empower every person and every organization on the planet to achieve more.",
    is_company_details_pdf: true,
    contact_person_name: "Gowtham",
    phone_number: 7566816191,
    email: "190010036@iitdh.ac.in",
    city: "indore",
    state: "Madhya pradesh",
    country: "India",
    pin_code: 380015,
    city_type: "Domestic",
    designation: "Software developer",
    description: "Nice Job",
    job_location: "Bengluru",
    is_description_pdf: true,
    compensation_CTC: 700000,
    compensation_gross: 1000000,
    compensation_take_home: 100000,
    compensation_bonus: 5000,
    is_compensation_details_pdf: true,
    bond_details: "2 years of bond",
    selection_procedure_rounds: [
        "Resume Shortlisting",
        "Technical Test",
        "Aptitude Test",
        "Pre-Placement Test",
        "Technical Interview",
        "HR Interview",
    ],
    selection_procedure_details: "Resume ShortlistingAptitude TestTechnical Interview",
    is_selection_procedure_details_pdf: true,
    tier: "4",
    tentative_date_of_joining: "2022-06-15",
    allowed_batch: ["2019"],
    allowed_branch: ["CSE", "EE", "ME"],
    tentative_no_of_offers: 2,
    rs_eligible: true,
    other_requirements: "THe CPI should be greater than 6.5",
    additional_info: [],
    email_verified: true,
    offer_accepted: true,
    deadline_datetime: "2022-06-08T14:34:21+05:30",
    created_at: "2022-06-06T14:34:21+05:30",
    updated_at: "2022-06-06T16:02:49.724376+05:30",
}, ];

const previousCompanies = [{
    id: "Q74IRZZMC3RP8F6",
    company_details_pdf_links: [{
            link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2FI5U4RDTV0OP0EM0_2019+Student+Details+-+Total%28State+Sort%29+-+Copy.pdf",
            name: "I5U4RDTV0OP0EM0_2019 Student Details - Total(State Sort) - Copy.pdf",
        },
        {
            link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2FW04JWWNNMIBX0JX_2019+Student+Details+-+Total%28State+Sort%29.pdf",
            name: "W04JWWNNMIBX0JX_2019 Student Details - Total(State Sort).pdf",
        },
        {
            link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2FT1BXP98WBT9BHOR_AP0313017732021LL-Driving+Licence+-+Copy.pdf",
            name: "T1BXP98WBT9BHOR_AP0313017732021LL-Driving Licence - Copy.pdf",
        },
    ],
    description_pdf_links: [{
        link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2FC78TE2Z67BPZ41O_CSE-V-SEM.pdf",
        name: "C78TE2Z67BPZ41O_CSE-V-SEM.pdf",
    }, ],
    compensation_pdf_links: [{
            link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2F8D5OFQ46H43DD3S_module5And6Attendance.pdf",
            name: "8D5OFQ46H43DD3S_module5And6Attendance.pdf",
        },
        {
            link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2FG8OU2PE919PFKSR_Print+Application11.pdf",
            name: "G8OU2PE919PFKSR_Print Application11.pdf",
        },
    ],
    selection_procedure_details_pdf_links: [{
            link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2FDZTQQ6YBGBQ47PY_screencapture-onlinesbi-sbi-sbicollect-fsssuccessresponseredirect-htm-2021-07-19-18_",
            name: "DZTQQ6YBGBQ47PY_screencapture-onlinesbi-sbi-sbicollect-fsssuccessresponseredirect-htm-2021-07-19-18_",
        },
        {
            link: "https://storage.googleapis.com/cdc-backend-attachments/company_attachments/Q54IRZZMC3RP8F6%2FN490PUXJEEN4JZ9_screencapture-onlinesbi-sbi-sbicollect-payment-suvidhapayment-htm-2021-07-19-23_12_3",
            name: "N490PUXJEEN4JZ9_screencapture-onlinesbi-sbi-sbicollect-payment-suvidhapayment-htm-2021-07-19-23_12_3",
        },
    ],
    company_name: "Make My Trip",
    address: "MakeMyTrip India Pvt. Ltd.5, Awagarh House, MG Road(next to Bachoomal collections)Agra (UP), - 282002India",
    company_type: "Private Sector",
    nature_of_business: "Technology",
    website: "www.makemytrip.com",
    company_details: "This s a very nice company",
    is_company_details_pdf: true,
    contact_person_name: "Gowtham",
    phone_number: 9390291911,
    email: "saisurya3127@gmail.com",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pin_code: 530013,
    city_type: "Domestic",
    designation: "Software Developer",
    description: "very nice job",
    is_description_pdf: true,
    compensation_CTC: 1200000,
    compensation_gross: 1100000,
    compensation_take_home: 1000000,
    compensation_bonus: 10000,
    compensation_details: "very good compensation",
    is_compensation_details_pdf: true,
    bond_details: "nil",
    selection_procedure_rounds: [
        "Resume Shortlisting",
        "Technical Interview",
        "HR Interview",
    ],
    selection_procedure_details: "All rounds are complusory",
    is_selection_procedure_details_pdf: true,
    tier: "4",
    tentative_date_of_joining: "2022-01-15",
    allowed_batch: ["2018", "2019"],
    allowed_branch: ["CSE", "EE"],
    tentative_no_of_offers: 5,
    other_requirements: "above 8 cpi",
    additional_info: ["School", "Home Town"],
    email_verified: false,
    offer_accepted: null,
    deadline_date: "2021-12-04",
    created_at: "2021-12-02T20:12:21+05:30",
}, ];

const applications = [{
    id: "1RAngddY31eozz8",
    student_details: {
        id: "190020035",
        resume_list: [{
            link: "http://localhost/storage/Resumes/190020035/1Ap8IyDw7ehteXx_Rohit%20Gour.pdf",
            name: "1Ap8IyDw7ehteXx_Rohit Gour.pdf",
        }, ],
        offers: [],
        roll_no: 190020035,
        name: "Rohit gour",
        batch: "2019",
        branch: "EE",
        phone_number: 6263169156,
        cpi: "6.86",
        can_apply: true,
    },
    resume_link: {
        link: "http://localhost/storage/Resumes/1RAngddY31eozz8/1Ap8IyDw7ehteXx_Rohit%20Gour.pdf",
        name: "1Ap8IyDw7ehteXx_Rohit Gour.pdf",
    },
    additional_info: "{}",
    selected: null,
    applied_at: "2022-06-06T16:05:43.457884+05:30",
    updated_at: "2022-06-06T16:05:43.457884+05:30",
    student: "190020035",
}, ];

export const adminAPIHandler = [
    // handle the post request for marking the status
    rest.post(API_ENDPOINT + "api/admin/markStatus", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Mark Status",
                message: "Marked Status",
            })
        );
    }),
    // handles the get request for getting the admin dashboard
    rest.get(API_ENDPOINT + "api/admin/getdashboard", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Get Dashboard - Admin",
                message: "Data Found",
                new: newCompanies,
                ongoing: ongoingCompanies,
                previous: previousCompanies,
            })
        );
    }),
    // handles the post request to update the deadline for specific placements
    rest.post(API_ENDPOINT + "api/admin/updateDeadline", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Update Deadline",
                message: "Deadline Updated",
            })
        );
    }),
    // handles the post request to update the offer acceptance status for specific placements
    rest.post(API_ENDPOINT + "api/admin/updateOfferAccepted", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Update Offer Accepted",
                message: "Offer Accepted Updated",
            })
        );
    }),
    // handles the post request to update email verification state for a specific placement.
    rest.post(API_ENDPOINT + "api/admin/updateEmailVerified", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Update Email Verified",
                message: "Email Verified Updated",
            })
        );
    }),
    // handles the post request to update additional_info for a specific placement.
    rest.post(
        API_ENDPOINT + "api/admin/updateAdditionalInfo",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    action: "Update Additional Info",
                    message: "Additional Info Updated",
                })
            );
        }
    ),
    // handles the get request to fetch all the applications applied by students for all placements
    rest.get(API_ENDPOINT + "api/admin/getApplications", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Get Applications",
                message: "Data Found",
                applications: applications,
            })
        );
    }),
    // handles the post request to submit a students application
    rest.post(API_ENDPOINT + "api/admin/submitApplication", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Add Student Application",
                message: "Application Added",
            })
        );
    }),
    // TODO Handle request to generate the csv file
    // handles the post request to add a PPO for a student in the corresponding company
    rest.post(API_ENDPOINT + "api/admin/addPPO", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Add PPO",
                message: "PPO Added",
            })
        );
    }),

    // handles the get request to fetch the application details of the required student
    // rest.get(
    //     API_ENDPOINT + "api/admin/getStudentApplication",
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.json({
    //                 action: "Get Student Application",
    //                 application_found: "true",
    //                 application_info: {
    //                     id: "F28IRGGMC3RP8Y8",
    //                     additional_info: {
    //                         "12th grade": "9.1",
    //                         "current GPA": "9.6",
    //                     },
    //                     resume: "resume_link",
    //                 },
    //                 student_details: {
    //                     name: "John",
    //                     batch: "2020",
    //                     branch: "MMAE",
    //                     resume_list: {
    //                         link: "http://localhost/storage/Resumes/200010021/resume_links",
    //                         name: "resume_link",
    //                     },
    //                 },
    //             })
    //         );
    //     }
    // ),
];