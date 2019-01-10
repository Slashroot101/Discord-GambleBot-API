create table roles
(
  id serial not null,
  name varchar(50) not null
);

create unique index roles_id_uindex
on roles (id);

create unique index roles_name_uindex
on roles (name);

alter table roles
  add constraint roles_pk
    primary key (id);

