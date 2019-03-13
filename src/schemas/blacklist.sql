-- auto-generated definition
create table blacklist
(
  id              serial                   not null
    constraint blacklist_pk
      primary key,
  user_id         integer                  not null
    constraint blacklist_users_id_fk
      references users,
  blacklist_date  timestamp with time zone not null,
  reason          varchar                  not null,
  user_who_banned integer                  not null
    constraint blacklist_users_id_fk_2
      references users
);

alter table blacklist
  owner to postgres;

create unique index blacklist_id_uindex
  on blacklist (id);

create unique index blacklist_user_id_uindex
  on blacklist (user_id);

