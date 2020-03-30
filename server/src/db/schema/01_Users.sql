DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id serial PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar varchar(255) NOT NULL,
  latitude varchar(255) NOT NULL,
  longitude varchar(255) NOT NULL,
  created_at timestamp DEFAULT NOW(),
  deleted_at timestamp,
  notifications boolean DEFAULT FALSE
);

