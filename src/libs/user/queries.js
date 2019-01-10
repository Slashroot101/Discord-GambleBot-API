exports.getByDiscordID = (id) => {
    return {
        name: 'fetch-user-by-discord-id',
        text: `SELECT users.*, points.*, blacklist.blacklist_date, blacklist.reason, roles.name as roleName FROM users
             JOIN points ON points.user_id = users.id 
             LEFT JOIN blacklist ON blacklist.user_id = users.id 
             JOIN roles ON users.role_id = roles.id WHERE discord_user_id = $1`,
        values: [ id ]
    };
};

exports.create = (user) => {
    return {
        name: 'create-user',
        text: 'INSERT INTO users(discord_user_id, created_on, role_id) VALUES($1, $2, 1) RETURNING *',
        values: [ user.discordUserID, new Date()]
    };
};

exports.isBlacklisted = (userID) => {
    return {
        name: 'is-user-blacklisted',
        text: 'SELECT * FROM blacklist where user_id = $1',
        values: [userID]
    }
};

exports.blacklist = (userID, userWhoBanned, reason, date) => {
    return {
        name: 'blacklist-user',
        text: 'INSERT INTO blacklist(user_id, blacklist_date, reason, user_who_banned) VALUES ($1, $4, $3, $2) RETURNING *',
        values: [userID, userWhoBanned, reason, date]
    }
};