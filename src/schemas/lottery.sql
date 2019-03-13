-- auto-generated definition
create table lottery
(
  id            serial  not null
    constraint lottery_pk
      primary key,
  locality_type integer not null,
  guild_id      integer
    constraint lottery_guilds_id_fk
      references guilds,
  start_date    integer not null,
  end_date      integer not null
);

alter table lottery
  owner to postgres;

create unique index lottery_id_uindex
  on lottery (id);

