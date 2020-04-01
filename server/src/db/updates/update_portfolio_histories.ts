import db from '../index';
import updatePortfolios from './updatePortfolios';

const updatePortfolioHistories = () => {
	db.query(`
    INSERT INTO portfolio_histories (portfolio_id, value)
    SELECT
      portfolios.id,
      portfolios.value
    FROM
      portfolios
  `);
};

export default updatePortfolioHistories;
