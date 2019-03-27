exports.create = (commandID, guildID, disabledBy) => ({
  name: 'create-disabled-command',
  text: 'INSERT INTO disabled_commands VALUES($1, $2, $3)',
  values: [commandID, guildID, disabledBy],
});

exports.removeByGuildID = (commandID, guildID) => ({

});