exports.create = (guildID, global = false) => ({
  name: 'create-guild',
  text: 'INSERT INTO guilds(guild_id, join_date, global) VALUES ($1, now(), $2) ON CONFLICT(guild_id) DO NOTHING RETURNING *',
  values: [guildID, global],
});

exports.createGuildBank = guildID => ({
  name: 'create-guild-bank',
  text: 'INSERT into guild_banks(points, guild_id) VALUES (0, $1) ON CONFLICT(guild_id) DO NOTHING RETURNING *',
  values: [guildID],
});

exports.addToPointsToGuildBank = (guildBankID, amount) => ({
  name: 'add-points-to-guild-bank',
  text: 'UPDATE guild_banks SET points = points + $2 FROM guilds WHERE guilds.guild_id = $1',
  values: [guildBankID, amount],
});

exports.getGuildBankByGuildID = guildBankID => ({
  name: 'get-guild-bank-by-guild-id',
  text: 'SELECT * FROM guild_banks JOIN guilds on guild_banks.guild_id = guilds.id WHERE guilds.guild_id = $1',
  values: [guildBankID],
});

exports.getByGuildID = guildID => ({
  name: 'get-guild-by-guildID',
  text: 'SELECT * FROM guilds WHERE guild_id = $1',
  values: [guildID],
});
