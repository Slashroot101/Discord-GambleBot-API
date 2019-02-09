exports.create = (guildID) => {
	return {
		name: 'create-guild',
		text: 'INSERT INTO guilds(guild_id, join_date) VALUES ($1, now()) ON CONFLICT(guild_id) DO NOTHING RETURNING *',
		values: [ guildID],
	};
};

exports.createGuildBank = (guildID) => {
	return {
		name: 'create-guild-bank',
		text: 'INSERT into guild_banks(points, guild_id) VALUES (0, $1) ON CONFLICT(guild_id) DO NOTHING RETURNING *',
		values: [guildID],
	};
};