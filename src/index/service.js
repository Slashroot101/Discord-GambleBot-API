const shortLinkService = require('../shortenedLinks/service');
const { boomify } = require('boom');
const fastify = require('fastify')

exports.getShortlinkFromUID = async (req, reply) => {
	try {
		const requestForShortlinkService = {};
		requestForShortlinkService.query = {shortCode: req.params.shortCode};
		console.log(req.params.shortCode)
		const urlToRedirect = await shortLinkService.getWithFilter(requestForShortlinkService);
		if(urlToRedirect.shortenedLinks.length === 0){
			return reply.callNotFound();
		}

		return reply.redirect(urlToRedirect.shortenedLinks[0].originalUrl);
	} catch (err) {
		throw boomify(err);
	}
}