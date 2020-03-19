import db from '../index';
import { QueryResult } from 'pg';

const getUserByEmail = (email: string) =>
	db
		.query(
			`
			SELECT * FROM users WHERE email = $1;
			`,
			[email]
		)
		.then((userObj: QueryResult) => userObj.rows[0])
		.catch((err: Error) => {
			throw err;
		});

export default getUserByEmail;
