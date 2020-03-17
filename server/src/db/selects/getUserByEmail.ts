const getUserByEmail = (email: string) => {
	// @TODO return pg query
	// see vicdevs repo for inspo
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

export default getUserByEmail;
