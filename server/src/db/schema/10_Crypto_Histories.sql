DROP TABLE IF EXISTS crypto_histories CASCADE;

CREATE TABLE crypto_histories (
  id serial PRIMARY KEY NOT NULL,
  crypto_id integer NOT NULL UNIQUE REFERENCES cryptos (id) ON DELETE CASCADE,
  TIME_SERIES_DAILY jsonb,
  TIME_SERIES_WEEKLY jsonb
);