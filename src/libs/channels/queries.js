exports.create = (discordChannelID, createdBy, guildID) => ({
  name: 'create-channel',
  text: 'INSERT INTO channels(discord_channel_id, created_by, guild_id) VALUES ($1, $2, $3) ON CONFLICT(guild_id) DO NOTHING RETURNING *',
  values: [discordChannelID, createdBy, guildID],
});

exports.getGuildForDiscordGuildID = discordGuildID => ({
  name: 'get-guild-channel-for-discord-guild-id',
  text: 'SELECT *, guilds.id as guildRowId, channels.id as channelid FROM channels JOIN guilds ON guilds.id = channels.guild_id WHERE guilds.guild_id = $1',
  values: [discordGuildID],
});

exports.deleteByID = channelID => ({
  name: 'delete-channel-by-id',
  text: 'DELETE FROM channels WHERE id = $1',
  values: [channelID],
});

exports.getGetForGuildID = ID => ({
  name: 'get-guild-by-id',
  text: 'SELECT *, guilds.id as guildRowId, channels.id as channelID FROM channels JOIN guilds on guilds.id = channels.guild_id WHERE guilds.id = $1',
  values: [ID],
});
