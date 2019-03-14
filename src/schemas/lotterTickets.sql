-- auto-generated definition
create table lottery_tickets
(
  id          serial  not null
    constraint lottery_tickets_pk
      primary key,
  lottery_id  integer not null
    constraint lottery_tickets_lottery_id_fk
      references lottery,
  num_tickets integer not null,
  user_id     integer not null
    constraint lottery_tickets_users_id_fk
      references users
);

alter table lottery_tickets
  owner to postgres;

create unique index lottery_tickets_id_uindex
  on lottery_tickets (id);

