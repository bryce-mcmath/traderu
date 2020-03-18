import db from '../index';

const deletePortfolio = (
	userId: string | number,
	portfolioId: string | number
) => {
	return db
		.query(
			`
			UPDATE
			portfolios
			SET
			deleted_at = NOW()
			WHERE user_id = $1 AND id = $2;
			`,
			[userId, portfolioId]
		)
		.then(() => 'Successfully deleted portfolio')
		.catch((err: Error) => {
			throw err;
		});
};

export default deletePortfolio;
