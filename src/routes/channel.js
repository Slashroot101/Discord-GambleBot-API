const router = new (require('restify-router')).Router();
const Channel = require('../libs/channels/channels');
const { getByGuildID: getGuildByDiscordID } = require('../libs/guild/guild');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    const existingChannel = await Channel.getChannelForDiscordGuildID(req.body.guildID);
    let guild;
    if (existingChannel !== undefined) {
      await Channel.deleteByID(existingChannel.channelid);
    } else {
      guild = await getGuildByDiscordID(req.body.guildID);
    }
  console.log(guild)
    const createdChannel = await Channel.create(
      req.body.discordChannelID,
      req.body.createdBy,
      existingChannel ? existingChannel.guildrowid : guild.id,
    );
    responseHandler(res, { channel: createdChannel });
  } catch (err) {
    console.log(err);
    errorHandler(res, err);
  }
  next();
});

router.get('/discord-guild-id/:id', async (req, res, next) => {
  try {
    const guildChannel = await Channel.getChannelForDiscordGuildID(req.params.id);
    responseHandler(res, { channel: guildChannel });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
