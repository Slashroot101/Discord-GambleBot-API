let db = require(`../database`);
let UserQueries = require(`./queries`);


exports.getByDiscordID = (discordID) => {
    return new Promise(async (resolve) => {
        let user = await db.query(UserQueries.getByDiscordID(discordID));
        resolve(user);
    });
};

exports.create = (discordID) => {
    return new Promise(async (resolve) => {
        let user = await db.query(UserQueries.create({discordUserID: discordID}));
        resolve(user);
    });
}

exports.isBlacklisted = (userID) => {
    return new Promise(async (resolve) => {
        let user = await db.query(UserQueries.isBlacklisted(userID));
        resolve(user.rows);
    });
};

exports.blacklist = (userID, userWhoBanned, reason, date = new Date()) => {
    return new Promise(async(resolve) => {
        let blacklistedUser = await db.query(UserQueries.blacklist(userID, userWhoBanned, reason, date));
        resolve(blacklistedUser.rows);
    });
};

