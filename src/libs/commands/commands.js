let db = require(`../database`);
let Commands = require(`./queries`);

exports.getByName = (commandName) => {
    return new Promise(async (resolve) => {
        let command = await db.query(Commands.getByName(commandName));
        resolve(command.rows[0]);
    });
};

exports.updateDurationAndUsage = (id, duration, usages) => {
    return new Promise(async(resolve) => {
        let command = await db.query(Commands.updateDurationAndUsage(id, duration, usages));
        resolve(command);
    });
}

exports.create = (duration, usages, name) => {
    return new Promise(async (resolve) => {
        let command = await db.query(Commands.create(duration, usages, name));
        resolve(command);
    });
};