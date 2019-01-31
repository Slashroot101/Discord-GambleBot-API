let db = require(`../database`);
let Guild = require(`./queries`);

exports.create = (guildID) => {
    return new Promise(async(resolve) => {
        let guild = await db.query(Guild.create(guildID));
        resolve(guild.rows[0]);
    });
};