import db from '../index';

//This query is a Snakey Boi
const getLocalRankings = (id: string | number) =>
	db.query(
		`
    (
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
        value >= (
          SELECT
            value
          FROM
            portfolios
          WHERE
            id = $1)
        AND
        portfolios.deleted_at IS NULL
        ORDER BY
          value ASC
        LIMIT 2)
    UNION (
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
        value <= (
          SELECT
            value
          FROM
            portfolios
          WHERE
            id = $1)
        AND
          portfolios.deleted_at IS NULL
        ORDER BY
        value DESC
        LIMIT 2);`,
		[id]
	);

export default getLocalRankings;
