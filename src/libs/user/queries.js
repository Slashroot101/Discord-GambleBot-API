exports.getByDiscordID = id => ({
  name: 'fetch-user-by-discord-id',
  text: `SELECT users.*, points.*, blacklist.blacklist_date, blacklist.reason, roles.name as roleName FROM users
             JOIN points ON points.user_id = users.id 
             LEFT JOIN blacklist ON blacklist.user_id = users.id 
             JOIN roles ON users.role_id = roles.id WHERE discord_user_id = $1`,
  values: [id],
});

exports.create = user => ({
  name: 'create-user',
  text: 'INSERT INTO users(discord_user_id, created_on, role_id) VALUES($1, $2, 1) RETURNING *',
  values: [user.discordUserID, new Date()],
});

exports.isBlacklisted = userID => ({
  name: 'is-user-blacklisted',
  text: 'SELECT * FROM blacklist where user_id = $1',
  values: [userID],
});

exports.blacklist = (userID, userWhoBanned, reason, date) => ({
  name: 'blacklist-user',
  text: 'INSERT INTO blacklist(user_id, blacklist_date, reason, user_who_banned) VALUES ($1, $4, $3, $2) RETURNING *',
  values: [userID, userWhoBanned, reason, date],
});

exports.removeFromBlacklist = userID => ({
  name: 'remove-from-blacklist-via-discord-id',
  text: 'DELETE FROM blacklist WHERE user_id = $1',
  values: [userID],
});

exports.updateRole = (userID, roleID) => ({
  name: 'update-user-role',
  text: 'UPDATE users set role_id = $1 WHERE id = $2 RETURNING *',
  values: [roleID, userID],
});

exports.getByID = userID => ({
  name: 'get-user-by-id',
  text: 'SELECT * from users WHERE id = $1',
  values: [userID],
});
