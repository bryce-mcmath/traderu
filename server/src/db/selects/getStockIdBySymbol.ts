import db from '../index';
import { QueryResult } from 'pg';

const getStockIdBySymbol = (symbol: string) =>
	db
		.query(
			`
    SELECT id FROM stocks WHERE symbol = $1;
    `,
			[symbol]
		)
		.then((stockObj: QueryResult) =>
			stockObj.rows.length > 0 ? stockObj.rows[0] : null
		)
		.catch((err: Error) => {
			throw err;
		});

export default getStockIdBySymbol;
