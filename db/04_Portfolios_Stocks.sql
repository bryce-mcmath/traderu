DROP TABLE IF EXISTS portfolios_assets CASCADE;

CREATE TABLE portfolios_stocks (
  id serial PRIMARY KEY NOT NULL,
  stock_id integer REFERENCES stocks (id) NOT NULL,
  portfolio_id integer REFERENCES portfolios (id) NOT NULL,
  quantity integer NOT NULL
);