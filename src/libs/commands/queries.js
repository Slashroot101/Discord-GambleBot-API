exports.getByName = commandName => ({
  name: 'find-command-by-name',
  text: 'SELECT * FROM commands where name = $1',
  values: [commandName],
});

exports.updateDurationAndUsage = (id, duration, usages) => ({
  name: 'update-duration-and-usage',
  text: 'UPDATE commands set duration = $2, usages = $3 WHERE id = $1 RETURNING *',
  values: [id, duration, usages],
});

exports.create = (duration, usages, name) => ({
  name: 'create-command',
  text: 'INSERT INTO commands (duration, usages, name) VALUES ($1, $2, $3)',
  values: [duration, usages, name],
});

exports.addToUserAudit = (commandID, userID) => ({
  name: 'create-user-audit',
  text: 'INSERT INTO command_history (command_id, execution_time, user_id) VALUES ($1, now(), $2) RETURNING *',
  values: [commandID, userID],
});

exports.getOldestAuditInDuration = (commandID, userID) => ({
  name: 'get-oldest-audit',
  text: `SELECT * FROM command_history
              JOIN commands on (commands.id = command_history.command_id)
              WHERE execution_time > (current_timestamp -  (interval '1 minutes' * (SELECT commands.duration FROM commands WHERE commands.id = $1)))
              AND command_id = $1 and user_id = $2
              ORDER BY execution_time asc
              limit 1`,
  values: [commandID, userID],
});

exports.getCommandHistoryCountByDuration = (commandID, userID) => ({
  name: 'get-command-history-by-duration',
  text: `SELECT COUNT(command_history.id) AS executedCommands,
              commands.usages as allowedUsages, now() as current_time FROM command_history
              JOIN commands on (commands.id = command_history.command_id)
              WHERE execution_time > (current_timestamp -  (interval '1 minutes' * (SELECT commands.duration FROM commands WHERE commands.id = $1)))
              AND command_id = $1 and user_id = $2
              GROUP BY allowedUsages`,
  values: [commandID, userID],
});

exports.toggleMaintenanceMode = (commandID, maintenance) => ({
  name: 'toggle-command-maintenance',
  text: 'UPDATE commands SET maintenance = $2 WHERE id = $1',
  values: [commandID, maintenance],
});
