import db from '../index';
import { QueryResult } from 'pg';

const getPortfoliosByUserId = (user_id: string | number) =>
	db
		.query(
			`
		SELECT * FROM portfolios WHERE user_id = $1 AND deleted_at IS NULL;
		`,
			[user_id]
		)
		.then((portfoliosObj: QueryResult) => portfoliosObj.rows)
		.catch((err: Error) => {
			throw err;
		});

export default getPortfoliosByUserId;
