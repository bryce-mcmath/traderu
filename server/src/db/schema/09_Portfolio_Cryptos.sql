DROP TABLE IF EXISTS portfolio_cryptos CASCADE;

CREATE TABLE portfolio_cryptos (
  id serial PRIMARY KEY NOT NULL,
  crypto_id integer NOT NULL REFERENCES cryptos (id) ON DELETE CASCADE,
  portfolio_id integer NOT NULL REFERENCES portfolios (id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  unique (portfolio_id, crypto_id)
);