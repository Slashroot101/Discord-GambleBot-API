-- auto-generated definition
create table points_audit_log
(
  id                 serial                   not null
    constraint points_audit_log_pk
      primary key,
  command_history_id integer                  not null
    constraint points_audit_log_commands_id_fk
      references commands,
  points             integer                  not null,
  execution_time     timestamp with time zone not null
);

alter table points_audit_log
  owner to postgres;

create unique index points_audit_log_id_uindex
  on points_audit_log (id);

