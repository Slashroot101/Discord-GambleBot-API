const { query } = require('../database');
const GuildBankQueries = require('./queries');

exports.create = async (guildBank) => {
  const guildBankRow = await query(GuildBankQueries.create(guildBank));
  return guildBankRow.rows[0];
};

exports.update = async (guildBank, rowID) => {
  const guildBankRow = await query(GuildBankQueries.update(guildBank, rowID));
  return guildBankRow.rows[0];
};

exports.getByDiscordGuildID = async (discordGuildID) => {
  const guildBank = await query(GuildBankQueries.getByDiscordGuildID(discordGuildID));
  return guildBank.rows[0];
};