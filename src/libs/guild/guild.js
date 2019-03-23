const db = require('../database');
const Guild = require('./queries');

exports.create = guildID => new Promise(async (resolve) => {
  const guild = await db.query(Guild.create(guildID));
  resolve(guild.rows[0]);
});

exports.createGuildBank = async guildID => new Promise(async (resolve) => {
  const guildBank = await db.query(Guild.createGuildBank(guildID));
  resolve(guildBank.rows[0]);
});

exports.addPointsToGuildBank = async (guildID, points) => new Promise(async (resolve) => {
  const guildBank = await db.query(Guild.addToPointsToGuildBank(guildID, points));
  resolve(guildBank.rows[0]);
});

exports.getGuildBankByGuildID = async guildID => new Promise(async(resolve) => {
  const guildBank = await db.query(Guild.getGuildBankByGuildID(guildID));
  resolve(guildBank.rows[0]);
});

exports.getByGuildID = async guildID => new Promise(async (resolve) => {
  const guild = await db.query(Guild.getByGuildID(guildID));
  resolve(guild.rows[0]);
});

exports.getByID = async id => new Promise(async (resolve) => {
  const guild = await db.query(Guild.getByID(id));
  resolve(guild.rows[0]);
});
