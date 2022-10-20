import API_ENDPOINT from '../../api/api_endpoint';
import { getCookie } from '../../utils/getCookie';

const GetDashboard = (token) => {
	return new Promise((myResolve, myReject) => {
		if (token) {
			fetch(API_ENDPOINT + 'api/student/getDashboard/', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + token,
					'X-CSRFToken': getCookie('csrftoken'),
				},
			})
				.then((result) => {
					if (result.status === 200) myResolve(result.json());
					else throw new Error('Error ' + result.status);
				})
				.catch((err) => {
					myReject(false);
				});
		} else {
			myReject(false);
		}
	});
};

const GetProfile = async (token) => {
	return new Promise((myResolve, myReject) => {
		if (token) {
			fetch(API_ENDPOINT + 'api/student/profile/', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + token,
					'X-CSRFToken': getCookie('csrftoken'),
				},
			})
				.then((result) => {
					if (result.status === 200) myResolve(result.json());
					else throw new Error('Error ' + result.status);
				})
				.catch((err) => {
					myReject(false);
				});
		} else {
			myReject(false);
		}
	});
};

const PostApplication = async (token, data) => {
	return new Promise((myResolve, myReject) => {
		if (token) {
			fetch(API_ENDPOINT + 'api/student/submitApplication/', {
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
					else throw new Error('Error ' + result.status);
				})
				.catch((err) => {
					myReject(false);
				});
		} else {
			myReject(false);
		}
	});
};

const WithDrawApplication = async (token, data) => {
	return new Promise((myResolve, myReject) => {
		if (token) {
			fetch(API_ENDPOINT + 'api/student/deleteApplication/', {
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
					else throw new Error('Error ' + result.status);
				})
				.catch((err) => {
					myReject(false);
				});
		} else {
			myReject(false);
		}
	});
};

export { GetDashboard, GetProfile, PostApplication, WithDrawApplication };
