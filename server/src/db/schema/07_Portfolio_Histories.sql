  DROP TABLE IF EXISTS portfolio_histories CASCADE;

  CREATE TABLE portfolio_histories (
    id serial PRIMARY KEY NOT NULL,
    portfolio_id integer NOT NULL REFERENCES portfolios (id) ON DELETE CASCADE,
    date_time timestamp DEFAULT NOW(),
    value decimal NOT NULL
  );

