let db = require(`../database`);
let Points = require(`./queries`);

exports.create = (userID) => {
    return new Promise(async(resolve) => {
        await db.query(Points.create(userID));
        resolve();
    });
};

exports.addPointsByDiscordID = (discordID, points) => {
    return new Promise(async (resolve) => {
        await db.query(Points.addPointsByDiscordID(discordID, points))
        resolve();
    });
};

exports.addPointsByUserID = (userID, points) => {
    return new Promise(async (resolve) => {
        await db.query(Points.addPointsByUserID(userID, points))
        resolve();
    });
};

exports.addPointsToUserAudit = (commandHistoryID, points) => {
    return new Promise(async (resolve) => {
        let audit = await db.query(Points.addToPointsLog(commandHistoryID, points))
        resolve(audit.rows[0]);
    });
}

exports.getLeaderboardByPageNumber = (pageNumber) => {
    return new Promise(async (resolve) => {
        let lb = await db.query(Points.getLeaderboardByPageNumber(pageNumber));
        resolve(lb.rows);
    });
};

exports.getNumberOfRows = () => {
    return new Promise(async (resolve) => {
        let rows = await db.query(Points.getNumberOfRows());
        resolve(rows.rows[0].count);
    });
}