exports.getByDiscordID = (id) => {
    return {
        name: 'fetch-user-by-discord-id',
        text: 'SELECT * FROM users JOIN points ON points.user_id = users.id WHERE discord_user_id = $1',
        values: [ id ]
    };
};

exports.create = (user) => {
    return {
        name: 'create-user',
        text: 'INSERT INTO users(discord_user_id, created_on) VALUES($1, $2) RETURNING *',
        values: [ user.discordUserID, new Date()]
    };
};