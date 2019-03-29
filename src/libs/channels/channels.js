const { query } = require('../database');
const ChannelQueries = require('./channels')

exports.create = async (channel) => {
  const newChannel = await query(ChannelQueries.create(channel));
  return newChannel.rows[0];
};

exports.getByGuildRowID = async (guildRowID) => {
  const channel = await query(ChannelQueries.getByGuildRowID(guildRowID));
  return channel.rows[0];
};

exports.deleteByRowID = async (rowID) => {
  const deletedChannel = await query(ChannelQueries.deleteByRowID(rowID));
  return deletedChannel.rows[0];
};