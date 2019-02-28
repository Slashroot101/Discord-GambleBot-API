-- auto-generated definition
create table points
(
  id                  serial  not null
    constraint points_pk
      primary key,
  current_balance     numeric not null,
  total_points_gained numeric not null,
  user_id             integer not null
    constraint points_user_id_fkey
      references users
);

alter table points
  owner to postgres;

create unique index points_id_uindex
  on points (id);

create unique index points_user_id_uindex
  on points (user_id);

