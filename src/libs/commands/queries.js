exports.getByName = (commandName) => {
    return {
        name: 'find-command-by-name',
        text: 'SELECT * FROM commands where name = $1',
        values: [ commandName ]
    }
};