-- auto-generated definition
create table commands
(
  id          serial                not null
    constraint commands_pkey
      primary key,
  duration    integer               not null,
  usages      integer               not null,
  name        varchar(50)           not null,
  maintenance boolean default false not null
);

alter table commands
  owner to postgres;

create unique index commands_name_uindex
  on commands (name);

