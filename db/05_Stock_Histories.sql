DROP TABLE IF EXISTS stock_histories CASCADE;

CREATE TABLE stock_histories (
  id serial PRIMARY KEY NOT NULL,
  stock_id integer REFERENCES stocks (id) NOT NULL,
  intraday_data json,
  daily_data json,
  weekly_data json
);