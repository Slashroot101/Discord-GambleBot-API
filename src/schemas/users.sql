create table users
(
  id              integer                  not null constraint users_pkey primary key,
  discord_user_id integer                  not null,
  created_on      timestamp with time zone not null
);
