import db from '../index';
import { QueryResult } from 'pg';

const getCryptoIdBySymbol = (symbol: string) =>
	db
		.query(
			`
    SELECT id FROM cryptos WHERE symbol = $1;
    `,
			[symbol]
		)
		.then((cryptoObj: QueryResult) =>
			cryptoObj.rows.length > 0 ? cryptoObj.rows[0].id : null
		)
		.catch((err: Error) => {
			throw err;
		});

export default getCryptoIdBySymbol;
