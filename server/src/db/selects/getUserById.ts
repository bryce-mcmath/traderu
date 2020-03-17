const getUserById = (id: string | number) => {
	// @TODO return pg query
	// see vicdevs repo for inspo
	return Promise.resolve({
		id: 1,
		name: 'Bob',
		email: 'b@g.com',
		hash: 'sldjaklsd',
		avatar: 'avatar_url',
		latitude: '43.123213',
		longitude: '-123.32432',
		created_at: '2019-20-12'
	});
};

export default getUserById;
