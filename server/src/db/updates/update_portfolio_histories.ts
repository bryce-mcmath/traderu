import db from '../index';

const updatePortfolioHistories = () => {
  db.query(`
    INSERT INTO portfolio_histories (portfolio_id, value)
    SELECT
      portfolios.id,
      portfolios.value
    FROM
      portfolios
  `);
}

updatePortfolioHistories();