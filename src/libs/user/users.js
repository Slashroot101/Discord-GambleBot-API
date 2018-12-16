let db = require(`../database`);
let { getByDiscordID, create } = require(`./queries`);


exports.getByDiscordID = (discordID) => {
    return new Promise(async (resolve) => {
        let user = await db.query(getByDiscordID(discordID));
        resolve(user);
    });
};

exports.create = (discordID) => {
    return new Promise(async (resolve) => {
        let user = await db.query(create({discordUserID: discordID}));
        resolve(user);
    });
}