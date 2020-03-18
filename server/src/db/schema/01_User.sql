DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id serial PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL,
  latitude VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  created_at timestamp DEFAULT NOW(),
  deleted_at timestamp
);