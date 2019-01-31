exports.create = (guildID) => {
    return {
        name: 'create-guild',
        text: 'INSERT INTO guilds(guild_id, join_date) VALUES ($1, now()) RETURNING *',
        values: [ guildID]
    }
};