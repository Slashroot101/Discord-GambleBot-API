create table blacklist
(
	id serial not null,
	user_id int not null
		constraint blacklist_users_id_fk
			references users,
	blacklist_date timestamptz not null,
	reason varchar not null,
	user_who_banned int not null
		constraint blacklist_users_id_fk_2
			references users
);

create unique index blacklist_id_uindex
	on blacklist (id);

create unique index blacklist_user_id_uindex
	on blacklist (user_id);

alter table blacklist
	add constraint blacklist_pk
		primary key (id);

