const errors = require('restify-errors');

const router = new (require('restify-router')).Router();
const Guild = require('../libs/guild/guild');
const { responseHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.guild
        || req.body.guild.discordGuildID === undefined
        || req.body.guild.joinDate === undefined
        || req.body.guild.isGlobal === undefined) {
      return next(new errors.BadRequestError({
        statusCode: 400,
      }, 'You must pass a guild to create in the body'));
    }

    const newGuild = await Guild.create(req.body.guild);
    responseHandler(res, { guild: newGuild });
    return next();
  } catch (err) {
    return next(new errors.InternalServerError());
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (req.params.id === undefined
      || req.body.guild.discordGuildID === undefined
      || req.body.guild.joinDate === undefined
      || req.body.guild.isGlobal === undefined) {
      return next(new errors.BadRequestError({
        statusCode: 400,
      }, 'You must pass a guild to create in the body'));
    }

    const guild = await Guild.updateByRowID(req.params.id, req.body.guild);
    responseHandler(res, { guild });
    return next();
  } catch (err) {
    return next(new errors.InternalServerError());
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (req.params.id === undefined) {
      return next(new errors.BadRequestError({
        statusCode: 400,
      }, 'You must pass a valid guild row id'));
    }

    const guild = await Guild.getByRowID(req.params.id);
    responseHandler(res, { guild });
  } catch (err) {
    return next(new errors.InternalServerError());
  }
});

router.get('/discord-guild-id/:id', async (req, res, next) => {
  try {
    if (req.params.id === undefined) {
      return next(new errors.BadRequestError({
        statusCode: 400,
      }, 'You must pass a valid discord guild id'));
    }

    const guild = await Guild.getByDiscordGuildID(req.params.id);
    responseHandler(res, { guild });
  } catch (err) {
    return next(new errors.InternalServerError());
  }
});

module.exports = router;
