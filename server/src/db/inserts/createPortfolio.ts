import db from '../index';
import { QueryResult } from 'pg';

const createPortfolio = (userId: string | number, portfolioName: string) =>
	db
		.query(
			`
		INSERT INTO portfolios(user_id, name, value, cash, buying_power)
		VALUES($1, $2, 100000, 100000, 100000)
		RETURNING *;
		`,
			[userId, portfolioName]
		)
		.then((portfolioObj: QueryResult) => portfolioObj.rows[0])
		.catch((err: Error) => {
			throw err;
		});

export default createPortfolio;
