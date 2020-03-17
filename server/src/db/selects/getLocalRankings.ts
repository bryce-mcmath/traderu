const getAllRankings = () => {
  return db.query(`
  (
    SELECT
      *
    FROM
      portfolios
    WHERE
      value >= (
        SELECT
          value
        FROM
          portfolios
        WHERE
          id = 13)
      ORDER BY
        value ASC
      LIMIT 2)
  UNION (
    SELECT
      *
    FROM
      portfolios
    WHERE
      value <= (
        SELECT
          value
        FROM
          portfolios
        WHERE
          id = 13)
      ORDER BY
        value DESC
      LIMIT 2)`
    );
}

export default getAllRankings;
