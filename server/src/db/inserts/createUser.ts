const createUser = (
	name: string,
	email: string,
	hash: string,
	avatar: string,
	location: object = { latitude: 'victorialat', longitude: 'victorialong' }
) => {
	// @TODO
	return Promise.resolve({
		id: 2,
		name: 'Bob',
		email: 'b@g.com',
		hash: 'djfalk',
		avatar: 'avatar_url',
		latitude: '43.123213',
		longitude: '-123.32432',
		created_at: '2019-20-12'
	});
};

export default createUser;
