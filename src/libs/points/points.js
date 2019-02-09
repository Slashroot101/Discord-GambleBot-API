const db = require('../database');
const Points = require('./queries');

exports.create = (userID) => {
	return new Promise(async (resolve) => {
		await db.query(Points.create(userID));
		resolve();
	});
};

exports.addPointsByDiscordID = (discordID, points) => {
	return new Promise(async (resolve) => {
		await db.query(Points.addPointsByDiscordID(discordID, points));
		resolve();
	});
};

exports.addPointsByUserID = (userID, points) => {
	return new Promise(async (resolve) => {
		await db.query(Points.addPointsByUserID(userID, points));
		resolve();
	});
};

exports.addPointsToUserAudit = (commandHistoryID, points) => {
	return new Promise(async (resolve) => {
		const audit = await db.query(Points.addToPointsLog(commandHistoryID, points));
		resolve(audit.rows[0]);
	});
};

exports.getNetCommandPoints = (commandID, userID) => {
	return new Promise(async (resolve) => {
		const netPoints = await db.query(Points.getNetCommandPoints(commandID, userID));
		resolve(netPoints.rows[0]);
	});
};

exports.getLeaderboardByPageNumber = (pageNumber) => {
	return new Promise(async (resolve) => {
		const lb = await db.query(Points.getLeaderboardByPageNumber(pageNumber));
		resolve(lb.rows);
	});
};

exports.getNumberOfRows = () => {
	return new Promise(async (resolve) => {
		const rows = await db.query(Points.getNumberOfRows());
		resolve(rows.rows[0].count);
	});
};