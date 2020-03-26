DROP TABLE IF EXISTS crypto_transactions CASCADE;

CREATE TABLE crypto_transactions (
  id serial PRIMARY KEY NOT NULL,
  portfolio_id integer NOT NULL REFERENCES portfolios (id) ON DELETE CASCADE,
  crypto_id integer NOT NULL REFERENCES cryptos (id) ON DELETE CASCADE,
  quantity decimal NOT NULL,
  date_time timestamp DEFAULT NOW() NOT NULL,
  type varchar(255) NOT NULL,
  value decimal NOT NULL
);