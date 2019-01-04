exports.getByName = (commandName) => {
    return {
        name: 'find-command-by-name',
        text: 'SELECT * FROM commands where name = $1',
        values: [ commandName ]
    }
};

exports.updateDurationAndUsage = (id, duration, usages) => {
    return {
        name: 'update-duration-and-usage',
        text: 'UPDATE commands set duration = $2, usages = $3 WHERE id = $1 RETURNING *',
        values: [id, duration, usages]
    }
};

exports.create = (duration, usages, name) => {
    return {
        name: 'create-command',
        text: 'INSERT INTO commands (duration, usages, name) VALUES ($1, $2, $3)',
        values: [ duration, usages, name ]
    }
};