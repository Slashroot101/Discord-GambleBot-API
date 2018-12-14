-- auto-generated definition
create table points
(
  id                  serial  not null
    constraint points_pk
      primary key,
  current_balance     integer not null,
  total_points_gained integer not null,
  user_id             integer
    constraint points_user_id_fkey
      references users
);

alter table points
  owner to postgres;

create unique index points_id_uindex
  on points (id);

