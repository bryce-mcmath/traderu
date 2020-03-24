import db from '../index';

const createPortfolioHistory = (portfolioId: number) =>
	db
		.query(
			`
		INSERT INTO portfolio_histories(portfolio_id, value)
		VALUES($1, 100000);
		`,
			[portfolioId]
    )
		.catch((err: Error) => {
			throw err;
		});

export default createPortfolioHistory;
