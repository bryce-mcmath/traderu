import db from '../index';

const getAllRankings = () => {
  return db.query(`
  SELECT
    users.name AS username,
    portfolios.name AS portfolio,
    portfolios.value
  FROM
    portfolios
  JOIN 
    users 
  ON 
    portfolios.user_id = users.id
  ORDER BY
    value DESC`
    );
}

export default getAllRankings;
