create table points_audit_log
(
	id serial not null,
	command_id int not null
		constraint points_audit_log_commands_id_fk
			references commands,
	points int not null,
	execution_time timestamptz not null
);

create unique index points_audit_log_id_uindex
	on points_audit_log (id);

alter table points_audit_log
	add constraint points_audit_log_pk
		primary key (id);
