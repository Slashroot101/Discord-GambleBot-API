create table disabled_commands
(
  id          serial  not null
    constraint disabled_commands_pk
      primary key,
  command_id  integer not null
    constraint disabled_commands_commands_id_fk
      references commands,
  guild_id    integer not null
    constraint disabled_commands_guilds_id_fk
      references guilds,
  disabled_by integer
    constraint disabled_commands_users_id_fk
      references users,
  disabled_on timestamp with time zone default now()
);

alter table disabled_commands
  owner to postgres;

create unique index disabled_commands_id_uindex
on disabled_commands (id);

