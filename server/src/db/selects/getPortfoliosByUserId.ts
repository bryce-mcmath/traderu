import db from '../index';
import { QueryResult } from 'pg';

const getPortfoliosByUserId = (user_id: string | number) =>
	db
		.query(
			`		
			SELECT
				portfolios.id,
				portfolios.user_id,
				portfolios.name,
				value,
				cash,
				buying_power,
				portfolios.created_at,
				portfolios.deleted_at,
				array_agg(stocks.name) AS stock_names
			FROM
				portfolios
				LEFT JOIN 
				(portfolios_stocks JOIN stocks ON stocks.id = portfolios_stocks.stock_id)
				ON portfolios.id = portfolios_stocks.portfolio_id
			WHERE
				user_id = $1
				AND deleted_at IS NULL
			GROUP BY
				portfolios.name,
				portfolios.id,
				buying_power,
				portfolios.created_at,
				portfolios.deleted_at,
				portfolios.user_id,
				value,
				cash
		`,
			[user_id]
		)
		.then((portfoliosObj: QueryResult) => portfoliosObj.rows)
		.catch((err: Error) => {
			throw err;
		});

export default getPortfoliosByUserId;
