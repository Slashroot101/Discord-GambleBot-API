const router = new (require('restify-router')).Router();
const Channel = require('../libs/channels/channels');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    const existingChannel = await Channel.getChannelForDiscordGuildID(req.body.guildID);
    if (existingChannel !== undefined) {
      await Channel.deleteByID(existingChannel.channelid);
    }
    const createdChannel = await Channel.create(
      req.body.discordChannelID,
      req.body.createdBy,
      existingChannel.guildrowid,
    );
    responseHandler(res, { channel: createdChannel });
  } catch (err) {
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
