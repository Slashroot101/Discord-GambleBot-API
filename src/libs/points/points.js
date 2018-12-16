let db = require(`../database`);
let { create } = require(`./queries`);

exports.create = (userID) => {
    return new Promise(async(resolve) => {
        await db.query(create(userID));
        resolve();
    });
};