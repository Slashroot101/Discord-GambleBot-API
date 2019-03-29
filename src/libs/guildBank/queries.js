exports.create = guildBank => ({
  name: 'create-guild-bank',
  text: 'INSERT INTO guild_banks(points, guild_id) VALUES ($1, $2) RETURNING *',
  values: [guildBank.points, guildBank.guildID],
});

exports.update = (guildBank, rowID) => ({
  name: 'update-guild-bank',
  text: 'UPDATE guild_banks SET points = $1, guild_id = $2 WHERE id = $3',
  values: [guildBank.points, guildBank.guildID, rowID],
});

exports.getByDiscordGuildID = discordGuildID => ({
  name: 'get-guild-bank-by-guild-id',
  text: 'SELECT * FROM guild_banks WHERE guild_id = $1',
  values: [discordGuildID],
});
