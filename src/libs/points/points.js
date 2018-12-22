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