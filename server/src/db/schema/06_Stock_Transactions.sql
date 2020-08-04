DROP TABLE IF EXISTS stock_transactions CASCADE;

CREATE TABLE stock_transactions (
  id serial PRIMARY KEY NOT NULL,
  portfolio_id integer NOT NULL REFERENCES portfolios (id) ON DELETE CASCADE,
  stock_id integer NOT NULL REFERENCES stocks (id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  date_time timestamp DEFAULT NOW(),
  type varchar(255) NOT NULL,
  value decimal NOT NULL
);