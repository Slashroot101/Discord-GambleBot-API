const GuildQueries = require('./queries');
const { query } = require('../database');

exports.create = async (guild) => {
  const newGuild = await query(GuildQueries.create(guild));
  return newGuild.rows[0];
};

exports.getByRowID = async (rowID) => {
  const guild = await query(GuildQueries.getByRowID(rowID));
  return guild.rows[0];
};

exports.getByDiscordGuildID = async (discordGuildID) => {
  const guild = await query(GuildQueries.getByDiscordGuildID(discordGuildID));
  return guild.rows[0];
};

exports.updateByRowID = async (guild, rowID) => {
  const updatedGuild = await query(GuildQueries.updateByRowID(guild, rowID));
  return updatedGuild.rows[0];
};

exports.getGlobalGuilds = async () => {
  const globalGuilds = await query(GuildQueries.getGlobalGuilds());
  return globalGuilds.rows;
};