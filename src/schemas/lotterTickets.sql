create table lottery_tickets
(
  id         serial                                 not null
    constraint lottery_tickets_pk
      primary key,
  lottery_id integer                                not null
    constraint lottery_tickets_lottery_id_fk
      references lottery,
  user_id    integer                                not null
    constraint lottery_tickets_users_id_fk
      references users,
  created_on timestamp with time zone default now() not null
);

alter table lottery_tickets
  owner to postgres;

create unique index lottery_tickets_id_uindex
on lottery_tickets (id);

