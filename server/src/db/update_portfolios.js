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



// const logOut = () => {
//   db.query(`
//   SELECT 
//     time_series_intraday -> 'Time Series (5min)' -> (
//       select * from json_object_keys(select time_series_intraday -> 'Time Series (5min)'
        
      
//         time_series_intraday -> 'Time Series (5min)'
//       where 'Time Series (5min)' = 
//       (select k from json_each_text(data->'gender') 
//       as j(k,v) order by v::numeric desc limit 1);
//   ) FROM

//   select * from your_table where 'male' = 
//   (select k from json_each_text(data->'gender') 
//   as j(k,v) order by v::numeric desc limit 1);
   
//   stock_histories
//   `).then(res => {
//     console.log(res.rows);
//   })
// }

const logOut = () => {
  db.query(`
select time_series_intraday -> 'Time Series (5min)' -> 
    (select k from json_object_keys(time_series_intraday -> 'Time Series (5min)') 
    as j(k) order by k::timestamp desc limit 1)

   FROM

  stock_histories
  `).then(res => {
    console.log(res.rows);
  })
}

logOut();

// update portfolios set value = (
//   SELECT time_series_intraday -> 'Time Series (5min)'
//   FROM
//      stock_histories
//   )
//   where id = 1

// MAX (
//   CAST (
//     json_object_keys (time_series_intraday -> 'Time Series (5min)') as DATE
//   )
// )