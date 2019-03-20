const router = new (require('restify-router')).Router();
const Guild = require('../libs/guild/guild');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    const createdGuildPromises = [];
    const createdGuildBankPromises = [];
    req.body.guilds.forEach(async (element) => {
      const guild = createdGuildPromises.push(Guild.create(element));
      if (guild) {
        createdGuildBankPromises.push(Guild.createGuildBank(guild.id));
      }
    });
    const createdGuilds = await Promise.all(createdGuildPromises);
    const createdGuildBanks = await Promise.all(createdGuildBankPromises);
    responseHandler(res, { guilds: createdGuilds, banks: createdGuildBanks });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.put('/id/:guildID/points', async (req, res, next) => {
  try {
    const guildPoints = await Guild.addPointsToGuildBank(req.params.guildID, req.params.points);
    responseHandler(res, { guildPoints });
  } catch (err) {
    console.log(err)
    errorHandler(res, err);
  }
  next();
});

router.get('/guild-id/:id', async (req, res, next) => {
  try {
    const guild = await Guild.getByGuildID(req.params.id);
    responseHandler(res, { guild });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/discord-guild-id/:id/bank', async (req, res, next) => {
  try {
    const guildBank = await Guild.getGuildBankByGuildID(req.params.id);
    responseHandler(res, { guildBank });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
