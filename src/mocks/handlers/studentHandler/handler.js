import { rest } from "msw";
import API_ENDPOINT from "../../../api/api_endpoint";

const profileDetails = {
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
};

const placements = [{
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
    deadline_datetime: "2022-06-08T14:34:21+05:30",
    created_at: "2022-06-06T14:34:21+05:30",
    updated_at: "2022-06-06T16:02:49.724376+05:30",
}, ];

const placementApplication = [{
    id: "1RAngddY31eozz8",
    placement: {
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
        deadline_datetime: "2022-06-08T14:34:21+05:30",
        created_at: "2022-06-06T14:34:21+05:30",
        updated_at: "2022-06-06T16:02:49.724376+05:30",
    },
    resume_link: {
        link: "http://localhost/storage/Resumes/1RAngddY31eozz8/1Ap8IyDw7ehteXx_Rohit%20Gour.pdf",
        name: "1Ap8IyDw7ehteXx_Rohit Gour.pdf",
    },
    additional_info: "{}",
    selected: null,
    applied_at: "2022-06-06T16:05:43.457884+05:30",
    updated_at: "2022-06-06T16:05:43.457884+05:30",
}, ];

export const studentAPIHandlers = [
    //  handles a get requset to get student profile
    rest.get(API_ENDPOINT + "api/student/profile/", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Student Profile",
                message: "Details Found",
                details: profileDetails,
            })
        );
    }),
    // handles a GET request to get student Dashbord
    rest.get(API_ENDPOINT + "api/student/getDashboard", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Get Dashboard - Student",
                message: "Data Found",
                placements: placements,
                placementApplication: placementApplication,
            })
        );
    }),
    // handles a Post request to add resume
    rest.post(API_ENDPOINT + "api/student/addResume/", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Upload Resume",
                message: "Resume Added",
            })
        );
    }),

    // handles a Post request to delete resume
    rest.post(API_ENDPOINT + "api/student/deleteResume/", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Delete Resume",
                message: "Resume Deleted",
            })
        );
    }),

    // handles a Post request to submit application
    rest.post(
        API_ENDPOINT + "api/student/submitApplication/",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    action: "Submit Application",
                    message: "Application Submitted",
                })
            );
        }
    ),
];