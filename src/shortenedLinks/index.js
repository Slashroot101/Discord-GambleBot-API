const shortenedService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createShortenedLink}, shortenedService.createShortenedLink);
  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
