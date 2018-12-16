-- auto-generated definition
create table users
(
  id              serial                   not null
    constraint users_pkey
      primary key,
  discord_user_id bigint                   not null,
  created_on      timestamp with time zone not null
);

alter table users
  owner to postgres;

create unique index users_discord_user_id_uindex
  on users (discord_user_id);

