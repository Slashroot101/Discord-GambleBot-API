-- auto-generated definition
create table lottery_localities
(
  id   serial not null
    constraint lottery_localities_pk
      primary key,
  name varchar
);

alter table lottery_localities
  owner to postgres;

create unique index lottery_localities_id_uindex
  on lottery_localities (id);

