const db = require('../database');
const Channel = require('./queries');

exports.create = async (discordChannelID, createdBy, guildID) => new Promise(async (resolve) => {
  const channel = await db.query(Channel.create(discordChannelID, createdBy, guildID));
  resolve(channel.rows[0]);
});

exports.getChannelForDiscordGuildID = async discordGuildID => new Promise(async (resolve) => {
  const channel = await db.query(Channel.getGuildForDiscordGuildID(discordGuildID));
  resolve(channel.rows[0]);
});

exports.deleteByID = async channelID => new Promise(async (resolve) => {
  await db.query(Channel.deleteByID(channelID));
  resolve();
});
