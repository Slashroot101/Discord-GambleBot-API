const db = require('../database');
const UserQueries = require('./queries');


exports.getByDiscordID = (discordID) => {
	return new Promise(async (resolve) => {
		const user = await db.query(UserQueries.getByDiscordID(discordID));
		resolve(user);
	});
};

exports.create = (discordID) => {
	return new Promise(async (resolve) => {
		const user = await db.query(UserQueries.create({ discordUserID: discordID }));
		resolve(user);
	});
};

exports.isBlacklisted = (userID) => {
	return new Promise(async (resolve) => {
		const user = await db.query(UserQueries.isBlacklisted(userID));
		resolve(user.rows);
	});
};

exports.blacklist = (userID, userWhoBanned, reason, date = new Date()) => {
	return new Promise(async (resolve) => {
		const blacklistedUser = await db.query(UserQueries.blacklist(userID, userWhoBanned, reason, date));
		resolve(blacklistedUser.rows);
	});
};

exports.removeFromBlacklist = (userID) => {
	return new Promise(async (resolve) => {
		await db.query(UserQueries.removeFromBlacklist(userID));
		resolve();
	});
};

exports.updateRoleID = (userID, roleID) => {
	return new Promise(async (resolve) => {
		const user = await db.query(UserQueries.updateRole(userID, roleID));
		resolve(user.rows[0]);
	});
};

