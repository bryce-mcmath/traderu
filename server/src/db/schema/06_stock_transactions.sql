DROP TABLE IF EXISTS stock_transactions CASCADE;

CREATE TABLE stock_transactions (
  id serial PRIMARY KEY NOT NULL,
  portfolio_id integer NOT NULL REFERENCES portfolios (id) ON DELETE CASCADE,
  stock_id integer NOT NULL REFERENCES stocks (id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  date_time timestamp NOT NULL,
  type varchar(255) NOT NULL,
  value decimal NOT NULL
);