exports.create = (channel) => ({
  name: 'create-channel',
  text: 'INSERT INTO channels(discord_channel_id, created_by, guild_id) VALUES($1, $2, $3)',
  values: [channel.discordChannelID, channel.createdBy, channel.guildID],
});

exports.getByGuildRowID = guildRowID => ({
  name: 'get-guild-by-id',
  text: 'SELECT * FROM channels WHERE guild_id = $1',
  values: [guildRowID],
});

exports.deleteByRowID = rowID => ({
  name: 'delete-by-row-id',
  text: 'DELETE FROM channels WHERE id = $1 RETURNING *',
  values: [rowID],
});