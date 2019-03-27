const db = require('../database');
const Commands = require('./queries');

exports.getByName = commandName => new Promise(async (resolve) => {
  const command = await db.query(Commands.getByName(commandName));
  resolve(command.rows[0]);
});

exports.updateDurationAndUsage = (id, duration, usages) => new Promise(async (resolve) => {
  const command = await db.query(Commands.updateDurationAndUsage(id, duration, usages));
  resolve(command.rows[0]);
});

exports.create = (duration, usages, name) => new Promise(async (resolve) => {
  const command = await db.query(Commands.create(duration, usages, name));
  resolve(command.rows[0]);
});

exports.addToUserAudit = (commandID, userID) => new Promise(async (resolve) => {
  const audit = await db.query(Commands.addToUserAudit(commandID, userID));
  resolve(audit.rows[0]);
});

exports.getOldestAuditInDuration = (commandID, userID) => new Promise(async (resolve) => {
  const audit = await db.query(Commands.getOldestAuditInDuration(commandID, userID));
  resolve(audit.rows[0]);
});

exports.getCommandHistoryCountByDuration = (commandID, userID) => new Promise(async (resolve) => {
  const audit = await db.query(Commands.getCommandHistoryCountByDuration(commandID, userID));
  if (audit.rows.length) {
    resolve(audit.rows[0]);
  } else {
    resolve();
  }
});

exports.toggleMaintenanceMode = (commandID, maintenance) => new Promise(async (resolve) => {
  const command = await db.query(Commands.toggleMaintenanceMode(commandID, maintenance));
  resolve(command.rows[0]);
});
