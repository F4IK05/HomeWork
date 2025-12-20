-- После входа в контейнер, вводим
-- psql -U myuser -d mydatabase

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);
