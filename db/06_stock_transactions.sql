DROP TABLE IF EXISTS stock_transactions CASCADE;

CREATE TABLE stock_transactions (
  id serial PRIMARY KEY NOT NULL,
  portfolio_id integer REFERENCES portfolios (id) NOT NULL,
  stock_id integer REFERENCES stocks (id) NOT NULL,
  quantity integer NOT NULL,
  date_time timestamp NOT NULL,
  type varchar(255) NOT NULL,
  value decimal NOT NULL
);