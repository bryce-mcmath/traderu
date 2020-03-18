import db from '../index';

const getUserByEmail = (email: string) =>
	db
		.query(
			`
	SELECT * FROM users WHERE email = $1
	RETURNING *;
	`,
			[email]
		)
		.then((userArray: object[]) => userArray[0])
		.catch((err: Error) => {
			throw err;
		});

export default getUserByEmail;
