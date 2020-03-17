
const getAllStocks = () => {
  return db.query(`
  SELECT name, symbol, 
  time_series_intraday -> 'Time Series (5min)'
  FROM 
    stocks JOIN stock_histories
    ON stocks.id = stock_histories.stock_id
    `
  )
}

export default getAllStocks;