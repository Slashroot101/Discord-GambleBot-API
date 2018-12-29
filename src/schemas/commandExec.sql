create table command_history
(
	id serial not null
		constraint command_history_users_user_id_fk
			references users (user_id),
	command_id int not null
		constraint command_history_commands_id_fk
			references commands,
	execution_time timestamptz not null,
	user_id int
);

create unique index command_history_id_uindex
	on command_history (id);

alter table command_history
	add constraint command_history_pk
		primary key (id);

