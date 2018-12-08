let db = require(`./database`);
let { getByDiscordID } = require(`./queries`);


exports.getByDiscordID = (discordID) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.query(getByDiscordID(discordID));
        resolve(user);
    });
};