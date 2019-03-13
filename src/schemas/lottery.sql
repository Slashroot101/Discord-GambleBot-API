create table public.lottery
(
  id            serial  not null
    constraint lottery_pk
      primary key,
  locality_type integer not null
    constraint lottery_lottery_localities_id_fk
      references lottery_localities,
  guild_id      integer not null
    constraint lottery_guilds_id_fk
      references guilds,
  start_date    integer not null,
  end_date      integer not null,
  ticket_cost   integer not null,
  max_tickets   integer not null
);

alter table public.lottery
  owner to postgres;

create unique index lottery_id_uindex
  on public.lottery (id);

