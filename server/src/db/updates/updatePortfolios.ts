import db from '../index';

const updatePortfolios = () => {
	db.query(
		`
    UPDATE
      portfolios
    SET
      value = (
        -- stock_sum: value they have in stocks
        -- crypto_sum: value they have in crypto
        SELECT
          (stock_sum + crypto_sum)
        FROM
          (
            -- stock_close: close value of most recent stock date in intraday
            -- if sum is null (not holding stocks), set to 0
            SELECT
              COALESCE (
                SUM(stock_close :: numeric * portfolio_stocks.quantity),
                0
              )
            FROM
              (
                -- Select stock id and close value from stock_histories
                SELECT
                  stock_id,
                  time_series_intraday -> 'Time Series (5min)' -> (
                    --select the most recent date (key) in the intraday JSON
                    SELECT
                      intraday_key
                    FROM
                      -- JSON key, value pairs as rows in fields intraday_key, v
                      jsonb_each(time_series_intraday -> 'Time Series (5min)') AS j (intraday_key, v)
                    ORDER BY
                      --set key type as timestamp, order descending (backwards in time), take first
                      intraday_key :: timestamp DESC
                    LIMIT
                      1
                  ) ->> '4. close' AS stock_close
                FROM
                  stock_histories
              ) AS stock_close_value
              JOIN portfolios_stocks ON stock_close_value.stock_id = portfolios_stocks.stock_id
            WHERE
              portfolio_id = portfolios.id
          ) as stock_sum
          JOIN (
            -- crypto sum
            COALESCE (SUM(crypto_close :: numeric * crypto_quantity), 0)
            FROM
              (
                -- Select crypto id and close value from crypto_histories
                SELECT
                  crypto_id,
                  digital_currency_daily -> 'Time Series (Digital Currency Daily)' -> (
                    --select the most recent date (key) in the daily JSON
                    SELECT
                      daily_key
                    FROM
                      -- JSON key, value pairs as rows in fields daily_key, v
                      jsonb_each(
                        digital_currency_daily -> 'Time Series (Digital Currency Daily)'
                      ) AS j (daily_key, v)
                    ORDER BY
                      --set key type as timestamp, order descending (backwards in time), take first
                      daily_key :: timestamp DESC
                    LIMIT
                      1
                  ) ->> '4. close' AS crypto_close
                FROM
                  crypto_histories
              ) AS crypto_close_value
              JOIN portfolios_cryptos ON crypto_close_value.crypto_id = portfolios_cryptos.crypto_id
            WHERE
              portfolio_id = portfolios.id
          ) as crypto_sum
      ) + portfolios.cash;
    `
	)
		.then(() => {})
		.catch((err: Error) => console.error(err));
};

export default updatePortfolios;
