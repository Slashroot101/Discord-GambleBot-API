exports.create = guild => ({
  name: 'create-guild',
  text: 'INSERT INTO guilds(guild_id, join_date, global) VALUES($1, $2, $3)',
  values: [guild.discordGuildID, guild.joinDate, guild.isGlobal],
});

exports.getByRowID = rowID => ({
  name: 'get-guild-by-id',
  text: 'SELECT * FROM guilds WHERE id = $1',
  values: [rowID],
});

exports.getByDiscordGuildID = discordGuildID => ({
  name: 'get-guild-by-discord-id',
  text: 'SELECT * FROM guilds WHERE guild_id = $1',
  values: [discordGuildID],
});

exports.updateByRowID = (guild, rowID) => ({
  name: 'update-by-row-id',
  text: 'UPDATE guilds set guild_id = $1, join_date = $2, global = $3 WHERE id = $4',
  values: [guild.guildID, guild.joinDate, guild.isGlobal, rowID],
});
