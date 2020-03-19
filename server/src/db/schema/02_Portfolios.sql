DROP TABLE IF EXISTS portfolios CASCADE;

CREATE TABLE portfolios (
  id serial PRIMARY KEY NOT NULL,
  user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  name varchar(255),
  value decimal NOT NULL,
  cash decimal NOT NULL,
  buying_power decimal NOT NULL,
  created_at timestamp DEFAULT NOW(),
  deleted_at timestamp,
  unique (user_id, name)
);