require('dotenv').config();
const { Pool } = require('pg');

const dbParams = { connectionString: process.env.DATABASE_URL };
const db = new Pool(dbParams);
db.connect();

const getStock = (symbol: string) => {
  return db.query(`
  SELECT name, symbol, 
  time_series_intraday -> 'Time Series (5min)' as stockData
  FROM 
    stocks JOIN stock_histories
    ON stocks.id = stock_histories.stock_id
  WHERE stocks.symbol = $1
    `, [symbol]
  )
}

export default getStock;