const indexService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {

	fastify.get('/:shortCode', {schema: schema.shortLinkRedirect}, indexService.getShortlinkFromUID);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
