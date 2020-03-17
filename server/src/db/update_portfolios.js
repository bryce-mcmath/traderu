const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();

const dbParams = { connectionString: process.env.DATABASE_URL };
const db = new Pool(dbParams);
db.connect();

const update_portfolio = (portfolio_id) => {
  //find all stock ids, quantities in the portfolio
    //for each stock, get the latest value
    // multiply latest value by quantity 
    // sum for all stocks
    //insert into portfolios value field
}

// Holy shitballs this one works
const logOut = () => {
  db.query(` 
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
          json_each(time_series_intraday -> 'Time Series (5min)') AS j (intraday_key,
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
  `).then(res => {
    console.log(res.rows);
  })
}
//Holy shitballs this one works
// const logOut = () => {
//   db.query(`
  // UPDATE portfolios set value = (
  // select SUM(close::numeric * quantity) from
  //   (SELECT stock_id, time_series_intraday -> 'Time Series (5min)' -> (
  //     SELECT k FROM json_each(time_series_intraday -> 'Time Series (5min)') 
  //     AS j(k,v)
  //     ORDER BY k::timestamp DESC
  //     LIMIT 1
  //   ) ->> '4. close' AS close

  //  FROM

  // stock_histories ) as tuna JOIN portfolios_stocks 
  // ON tuna.stock_id = portfolios_stocks.stock_id
  // WHERE portfolio_id = portfolios.id)
//   `).then(res => {
//     console.log(res.rows);
//   })
// }
// const logOut = () => {
//   db.query(`
//   UPDATE portfolios set value = (
//   select SUM(close::numeric * quantity) from
//     (SELECT stock_id, time_series_intraday -> 'Time Series (5min)' -> (
//       SELECT k FROM json_each(time_series_intraday -> 'Time Series (5min)') 
//       AS j(k,v)
//       ORDER BY k::timestamp DESC
//       LIMIT 1
//     ) ->> '4. close' AS close

//    FROM

//   stock_histories ) as tuna JOIN portfolios_stocks 
//   ON tuna.stock_id = portfolios_stocks.stock_id
//   WHERE portfolio_id = portfolios.id)
//   `).then(res => {
//     console.log(res.rows);
//   })
// }
// //Holy shitballs this one works, returns value
// const logOut = () => {
//   db.query(`
//   select SUM(close::numeric * quantity) from
//     (SELECT stock_id, time_series_intraday -> 'Time Series (5min)' -> (
//       SELECT k FROM json_each(time_series_intraday -> 'Time Series (5min)') 
//       AS j(k,v)
//       ORDER BY k::timestamp DESC
//       LIMIT 1
//     ) ->> '4. close' AS close

//    FROM

//   stock_histories ) as tuna JOIN portfolios_stocks 
//   ON tuna.stock_id = portfolios_stocks.stock_id
//   WHERE portfolio_id = 1
//   `).then(res => {
//     console.log(res.rows);
//   })
// }
//progress
// const logOut = () => {
//   db.query(`
//   select close::numeric from
//     (SELECT time_series_intraday -> 'Time Series (5min)' -> (
//       SELECT k FROM json_each(time_series_intraday -> 'Time Series (5min)') 
//       AS j(k,v)
//       ORDER BY k::timestamp DESC
//       LIMIT 1
//     ) ->> '4. close' AS close

//    FROM

//   stock_histories) as tuna
//   `).then(res => {
//     console.log(res.rows);
//   })
// }

logOut();
