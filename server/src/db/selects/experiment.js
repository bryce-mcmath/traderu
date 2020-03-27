import db from '../index';

db.query(
	`
      select * from
      (
        WITH stocks as (
          SELECT stocks.name, portfolios_stocks.quantity, portfolio_id
          FROM stocks JOIN portfolios_stocks ON stocks.id = stock_id
        )
        SELECT portfolios.*, json_agg(stocks) as stocks
        FROM portfolios left join stocks on portfolios.id = portfolio_id
        WHERE
        user_id = $1
        AND deleted_at IS NULL group by portfolios.id
      ) as a
      JOIN (
        WITH values as (
          SELECT portfolio_histories.value, portfolio_histories.date_time, portfolio_id
          FROM portfolio_histories
        )
        SELECT id, json_agg(values) as values
        FROM portfolios left join values on portfolios.id = values.portfolio_id
        WHERE
        user_id = $1
        AND deleted_at IS NULL group by portfolios.id
      ) as b
      ON a.id = b.id
		`,
	[3]
).then(res => res.rows.map(obj => console.log(JSON.stringify(obj))));
// .then(res => res.rows.map(obj => obj.portfolio_history.map(obj => console.log('new', JSON.stringify(obj)))))
// db
// 		.query(
// 			`
//       WITH stocks as (
//         SELECT stocks.name, portfolios_stocks.quantity, portfolio_id
//         FROM stocks JOIN portfolios_stocks ON stocks.id = stock_id
//       ), values as (
//         SELECT portfolio_histories.value, portfolio_histories.date_time, portfolio_id
//         FROM portfolio_histories
//       )
//       SELECT id, json_agg(stocks) as stocks, json_agg(values) as values
//       FROM portfolios left join stocks on portfolios.id = portfolio_id left join values on portfolios.id = values.portfolio_id
//       WHERE
//       user_id = $1
//       AND deleted_at IS NULL group by portfolios.id
// 		`,
// 			[3]
// 		)
// 		.then(res => res.rows.map(obj => console.log(JSON.stringify(obj))))
// 		// .then(res => res.rows.map(obj => obj.portfolio_history.map(obj => console.log('new', JSON.stringify(obj)))))
