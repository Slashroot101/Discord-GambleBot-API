create table guilds
(
	id serial not null,
	guild_id bigint not null,
	join_date timestamptz not null
);

create unique index guilds_guild_id_uindex
	on guilds (guild_id);

create unique index guilds_id_uindex
	on guilds (id);

alter table guilds
	add constraint guilds_pk
		primary key (id);

