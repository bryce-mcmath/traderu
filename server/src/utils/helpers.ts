export const getUserByEmail = (email: string) => {
	// @TODO return pg query
	// see foodzebra repo for inspo
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

export const getUserById = (id: string | number) => {
	// @TODO return pg query
	// see vicdevs repo for inspo
	// DO NOT resolve id or password!
	return Promise.resolve({
		name: 'Bob',
		email: 'b@g.com',
		avatar: 'avatar_url',
		latitude: '43.123213',
		longitude: '-123.32432',
		created_at: '2019-20-12'
	});
};
