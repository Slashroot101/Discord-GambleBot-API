const router = new (require('restify-router')).Router();
const Guild = require('../libs/guild/guild');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/id/:guildID', async (req, res, next) => {
  try {
    const guild = await Guild.create(req.params.guildID);
    if (guild) {
      await Guild.createGuildBank(guild.id);
    }
    responseHandler(res, { guild });
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
    errorHandler(res, err);
  }
  next();
});

router.get('/guild-id/:id', async (req, res, next) => {
  try {
    const guild = await Guild.getByGuildID(req.params.id);
    responseHandler(res, { guild });
  } catch (err) {
    console.log(err);
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
