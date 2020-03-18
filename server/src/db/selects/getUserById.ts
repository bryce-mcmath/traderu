import db from '../index';

const getUserById = (id: string | number) =>
	db
		.query(
			`
		SELECT * FROM users WHERE id = $1
		RETURNING *;
		`,
			[id]
		)
		.then((userArray: object[]) => userArray[0])
		.catch((err: Error) => {
			throw err;
		});

export default getUserById;
