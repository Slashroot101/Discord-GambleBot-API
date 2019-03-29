const errors = require('restify-errors');

const router = new (require('restify-router')).Router();
const GuildBank = require('../libs/guildBank/guildBank');
const { responseHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    const guildBank = await GuildBank.create(req.body.guildBank);
    responseHandler(res, { guildBank });
    return next();
  } catch (err) {
    return next(new errors.InternalServerError());
  }
});

router.put('/:id', async (req, res,  next) => {
  try {
    const guildBank = await GuildBank.update(req.body.guildBank);
    responseHandler(res, { guildBank });
    return next();
  } catch (err) {
    return next(new errors.InternalServerError());
  }
});

router.get('/discord-guild-id/:id', async (req, res, next) => {
  try {
    const guildBank = await GuildBank.getByDiscordGuildID(req.params.id);
    responseHandler(res, { guildBank });
    return next();
  } catch (err) {
    return next(new errors.InternalServerError());
  }
});

module.exports = router;
