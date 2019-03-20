create table command_history
(
  id             serial                   not null
    constraint command_history_pk
      primary key,
  command_id     integer                  not null
    constraint command_history_commands_id_fk
      references commands,
  execution_time timestamp with time zone not null,
  user_id        integer
    constraint command_history_users_id_fk
      references users
);

alter table command_history
  owner to postgres;

create unique index command_history_id_uindex
  on command_history (id);

