import db from '../index';
import { QueryResult } from 'pg';

const getUserById = (id: string | number) =>
	db
		.query(
			`
		SELECT * FROM users WHERE id = $1;
		`,
			[id]
		)
		.then((userObj: QueryResult) => userObj.rows[0])
		.catch((err: Error) => {
			throw err;
		});

export default getUserById;
