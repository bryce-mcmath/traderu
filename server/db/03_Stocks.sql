DROP TABLE IF EXISTS stocks CASCADE;

CREATE TABLE stocks (
  id serial PRIMARY KEY NOT NULL,
  symbol varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  description text,
  market varchar(255)
);