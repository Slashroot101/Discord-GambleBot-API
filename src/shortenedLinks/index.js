const shortenedService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
	fastify.post('/', {schema: schema.createShortenedLink}, shortenedService.createShortenedLink);
	fastify.get('/', {schema: schema.getWithFilter}, shortenedService.getWithFilter);
	fastify.put('/:id', {schema: schema.update}, shortenedService.update);
  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
