import db from '../index';

const getAllRankings = () => {
	return db.query(`
  SELECT
    users.name AS username,
    users.avatar AS avatar,
    portfolios.name AS portfolio,
    portfolios.value AS value
  FROM
    portfolios
  JOIN
    users
  ON
    portfolios.user_id = users.id
  WHERE
    portfolios.deleted_at IS NULL
  ORDER BY
    value DESC`);
};

export default getAllRankings;
