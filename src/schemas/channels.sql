-- auto-generated definition
create table channels
(
  id                 serial  not null
    constraint channels_pk
      primary key,
  discord_channel_id bigint  not null,
  created_by         integer not null
    constraint channels_users_id_fk
      references users,
  guild_id           integer not null
    constraint channels_guilds_id_fk
      references guilds
);

alter table channels
  owner to postgres;

create unique index channels_id_uindex
on channels (id);

create unique index channels_guild_id_uindex
on channels (guild_id);

