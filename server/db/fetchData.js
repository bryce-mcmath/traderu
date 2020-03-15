const { Pool } = require('pg');
require('dotenv').config();

const dbParams = { connectionString: process.env.DATABASE_URL };
const db = new Pool(dbParams);
db.connect();

//Boilerplate to check out long form for stock history info. The browser is unfortunately
//inconsistent for returning huge JSON objects apparently
const displayInfo = () => {
  db.query(`select time_series_intraday from stock_histories where stock_id = 1;`)
  .then(res => console.log(res.rows[0]['time_series_intraday']['Time Series (5min)']))
}

displayInfo();