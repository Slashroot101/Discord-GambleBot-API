-- auto-generated definition
create table guild_banks
(
  id       serial  not null
    constraint guild_banks_pk
      primary key,
  points   integer not null,
  guild_id bigint  not null
    constraint guild_banks_guilds_id_fk
      references guilds
);

alter table guild_banks
  owner to postgres;

create unique index guild_banks_id_uindex
  on guild_banks (id);

create unique index guild_banks_guild_id_uindex
  on guild_banks (guild_id);

