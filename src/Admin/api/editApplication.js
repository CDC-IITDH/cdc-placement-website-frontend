import API_ENDPOINT from '../../api/api_endpoint';
import { getCookie } from '../../utils/getCookie';

const editApplication = (token, data) => {
	return new Promise((myResolve, myReject) => {
		if (token) {
			fetch(API_ENDPOINT + 'api/admin/submitApplication/', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
					'X-CSRFToken': getCookie('csrftoken'),
				},
				body: JSON.stringify(data),
			})
				.then((result) => {
					if (result.status === 200) myResolve(result.json());
					else throw new Error(result.status);
				})
				.catch((err) => {
					myReject(err);
				});
		} else {
			myReject(false);
		}
	});
};

export default editApplication;
