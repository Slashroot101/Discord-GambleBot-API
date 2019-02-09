const db = require('../database');
const Guild = require('./queries');

exports.create = (guildID) => {
	return new Promise(async (resolve) => {
		const guild = await db.query(Guild.create(guildID));
		resolve(guild.rows[0]);
	});
};

exports.createGuildBank = async (guildID) => {
	return new Promise(async (resolve) => {
		const guildBank = await db.query(Guild.createGuildBank(guildID));
		resolve(guildBank.rows[0]);
	});
};