CREATE TABLE commands(
  id serial primary key,
  duration integer not null,
  usages integer not null,
  name VARCHAR(50) not null
)