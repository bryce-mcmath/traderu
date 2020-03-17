
UPDATE
  portfolios
SET
  value = (
    -- close: close value of most recent stock date in intraday
    -- quantitiy: quantity of stock in portfolios_stocks
    -- if sum is null (not holding stocks), set to 0
    SELECT
      COALESCE (SUM(close::numeric * quantity), 0)
    FROM (
      -- Select stock id and close value from stock_histories
      SELECT
        stock_id,
        time_series_intraday -> 'Time Series (5min)' -> (
          --select the most recent date (key) in the intraday JSON
          SELECT
            intraday_key
          FROM
            -- JSON key, value pairs as rows in fields intraday_key, v
            jsonb_each(time_series_intraday -> 'Time Series (5min)') AS j (intraday_key,
              v)
          ORDER BY
            --set key type as timestamp, order descending (backwards in time), take first 
            intraday_key::timestamp DESC
          LIMIT 1) ->> '4. close' AS close
      FROM
        stock_histories) AS close_value
      JOIN portfolios_stocks ON close_value.stock_id = portfolios_stocks.stock_id
    WHERE
      --value includes held cash
      portfolio_id = portfolios.id) + portfolios.cash