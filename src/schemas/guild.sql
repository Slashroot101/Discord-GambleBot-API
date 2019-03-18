-- auto-generated definition
create table guilds
(
  id        serial                   not null
    constraint guilds_pk
      primary key,
  guild_id  bigint                   not null,
  join_date timestamp with time zone not null,
  global    boolean default false    not null
);

alter table guilds
  owner to postgres;

create unique index guilds_guild_id_uindex
  on guilds (guild_id);

create unique index guilds_id_uindex
  on guilds (id);

