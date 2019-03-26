-- auto-generated definition
create table lottery
(
  id            integer default nextval('lottery_id_seq'::regclass) not null
    constraint lottery_pk
      primary key,
  locality_type integer                                             not null
    constraint lottery_lottery_localities_id_fk
      references lottery_localities,
  guild_id      integer                                             not null
    constraint lottery_guilds_id_fk
      references guilds,
  start_date    timestamp with time zone                            not null,
  end_date      timestamp with time zone                            not null,
  ticket_cost   integer                                             not null,
  max_tickets   integer                                             not null,
  is_done       boolean default false                               not null,
  created_by    integer
    constraint lottery_users_id_fk
      references users,
  is_queued     boolean default false,
  winner        integer
    constraint lottery_users_id_fk_2
      references users
);

alter table lottery
  owner to postgres;

create unique index lottery_id_uindex
on lottery (id);

