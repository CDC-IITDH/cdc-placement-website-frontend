import { rest } from "msw";
import API_ENDPOINT from "../../../api/api_endpoint";

const profileDetails = {
    id: "190010036",
    resume_list: [{
        link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
        name: "8KIOT3PW1JIS718_CSE-V-SEM.pdf",
    }, ],
    offers: [{
        designation: "Software Developer",
        company_name: "Make My Trip",
        application_id: "LLW4STE76GEJYOR",
    }, ],
    roll_no: 190010036,
    name: "Gowtham Sai",
    batch: "2019",
    branch: "CSE",
    phone_number: 9390291911,
    cpi: "9.15",
};

const placements = [{
        id: "Q54IRZZMC3RP8F6",
        company_details_pdf_links: [{
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                name: "I5U4RDTV0OP0EM0_2019 Student Details - Total(State Sort) - Copy.pdf",
            },
            {
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                name: "W04JWWNNMIBX0JX_2019 Student Details - Total(State Sort).pdf",
            },
            {
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                name: "T1BXP98WBT9BHOR_AP0313017732021LL-Driving Licence - Copy.pdf",
            },
        ],
        description_pdf_links: [{
            link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
            name: "C78TE2Z67BPZ41O_CSE-V-SEM.pdf",
        }, ],
        compensation_pdf_links: [{
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                name: "8D5OFQ46H43DD3S_module5And6Attendance.pdf",
            },
            {
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                name: "G8OU2PE919PFKSR_Print Application11.pdf",
            },
        ],
        selection_procedure_details_pdf_links: [{
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                name: "DZTQQ6YBGBQ47PY_screencapture-onlinesbi-sbi-sbicollect-fsssuccessresponseredirect-htm-2021-07-19-18_",
            },
            {
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
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
        deadline_date: "2021-12-04",
        created_at: "2021-12-02T20:12:21+05:30",
    },
    {
        id: "LLW4STE76GEJYOR",
        placement: {
            id: "Q54IRZZMC3RP8F6",
            company_details_pdf_links: [{
                    link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                    name: "I5U4RDTV0OP0EM0_2019 Student Details - Total(State Sort) - Copy.pdf",
                },
                {
                    link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                    name: "W04JWWNNMIBX0JX_2019 Student Details - Total(State Sort).pdf",
                },
                {
                    link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                    name: "T1BXP98WBT9BHOR_AP0313017732021LL-Driving Licence - Copy.pdf",
                },
            ],
            description_pdf_links: [{
                link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                name: "C78TE2Z67BPZ41O_CSE-V-SEM.pdf",
            }, ],
            compensation_pdf_links: [{
                    link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                    name: "8D5OFQ46H43DD3S_module5And6Attendance.pdf",
                },
                {
                    link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                },
            ],
            selection_procedure_details_pdf_links: [{
                    link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
                    name: "DZTQQ6YBGBQ47PY_screencapture-onlinesbi-sbi-sbicollect-fsssuccessresponseredirect-htm-2021-07-19-18_",
                },
                {
                    link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
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
            deadline_date: "2021-12-04",
            created_at: "2021-12-02T20:12:21+05:30",
        },
        resume_link: "http://assets.digitalocean.com/books/how-to-code-in-reactjs.pdf",
        additional_info: '{"School": "Narayana English Medium High School", "Home Town": "Vizag"}',
        selected: null,
        applied_at: "2021-12-02T21:58:18.032466+05:30",
    },
];

export const studentAPIHandlers = [
    //  handles a POST requset to add student profile
    rest.post(API_ENDPOINT + "api/student/profile/", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Student Profile",
                message: "Details Found",
                profileDetails,
            })
        );
    }),

    // handles a GET request to get student Dashbord
    rest.get(API_ENDPOINT + "api/student/getDashboard", (req, res, ctx) => {
        return res(
            ctx.json({
                action: "Get Dashboard - Student",
                message: "Data Found",
                placements,
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