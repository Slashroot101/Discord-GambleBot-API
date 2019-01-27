create view net_command_points as
SELECT sum(points_audit_log.points) AS total_points_gained,
    ch.command_id,
    ch.user_id
FROM (points_audit_log
JOIN command_history ch ON ((points_audit_log.command_history_id = ch.id)))
GROUP BY ch.command_id, ch.user_id;

alter table net_command_points
owner to postgres;

