import db from '../index';

//This query is a Snakey Boi
const getLocalRankings = (id: string) => {
  return db.query(`
  (
    SELECT
      users.name AS username,
      users.avatar,
      portfolios.name AS portfolio,
      portfolios.value
    FROM
      portfolios
    JOIN 
      users 
    ON 
      portfolios.user_id = users.id
    WHERE
      value >= (
        SELECT
          value
        FROM
          portfolios
        WHERE
          id = $1)
      ORDER BY
        value ASC
      LIMIT 2)
  UNION (
    SELECT
      users.name AS username,
      users.avatar,
      portfolios.name AS portfolio,
      portfolios.value
    FROM
      portfolios
    JOIN 
      users 
    ON 
      portfolios.user_id = users.id
    WHERE
      value <= (
        SELECT
          value
        FROM
          portfolios
        WHERE
          id = $1)
      ORDER BY
        value DESC
      LIMIT 2)`,
    [id]);
}

export default getLocalRankings;
