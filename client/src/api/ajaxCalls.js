import Axios from 'axios';

export default {
	loginAuth(email = '', password = '') {
		return Axios.post('/api/login', {
			email: email,
			password: password
		});
	}
};
