DROP TABLE IF EXISTS portfolios CASCADE;

CREATE TABLE portfolios (
  id serial PRIMARY KEY NOT NULL,
  user_id integer REFERENCES users (id) NOT NULL,
  name varchar(255) NOT NULL,
  value decimal NOT NULL default 10000,
  cash decimal NOT NULL,
  buying_power decimal NOT NULL,
  created_at timestamp NOT NULL,
  deleted_at timestamp
);