DROP TABLE IF EXISTS portfolios_stocks CASCADE;

CREATE TABLE portfolios_stocks (
  id serial PRIMARY KEY NOT NULL,
  stock_id integer NOT NULL REFERENCES stocks (id) ON DELETE CASCADE,
  portfolio_id integer NOT NULL REFERENCES portfolios (id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  unique (portfolio_id, stock_id)
);