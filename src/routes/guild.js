const router = new (require('restify-router')).Router();
const Guild = require('../libs/guild/guild');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/id/:guildID', async function(req, res, next) {
	try {
		const guild = await Guild.create(req.params.guildID);
		if(!guild.length) {
			await Guild.createGuildBank(guild.id);
		}
		responseHandler(res, { guild });
	}
	catch (err) {
		errorHandler(res, err);
	}
	next();
});

module.exports = router;