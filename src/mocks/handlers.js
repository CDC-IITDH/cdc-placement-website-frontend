import { rest } from 'msw';

export const handlers = [
	//  handles a POST add profile request
	rest.post(
		'../../api/api_endpoint/api/student/addResume/',
		(req, res, ctx) => {
			return res(
				ctx.json({
					action: 'Student Profile',
					message: 'Details Found',
					details: {
						id: '190010036',
						resume_list: [
							{
								link: 'https://storage.googleapis.com/cdc-backend-attachments/resume/190010036%2F8KIOT3PW1JIS718_CSE-V-SEM.pdf',
								name: '8KIOT3PW1JIS718_CSE-V-SEM.pdf',
							},
						],
						offers: [
							{
								designation: 'Software Developer',
								company_name: 'Make My Trip',
								application_id: 'LLW4STE76GEJYOR',
							},
						],
						roll_no: 190010036,
						name: 'Gowtham Sai',
						batch: '2019',
						branch: 'CSE',
						phone_number: 9390291911,
						cpi: '9.15',
					},
				})
			);
		}
	),
	// handles a GET /user request
	// rest.get('/user', null),
];
