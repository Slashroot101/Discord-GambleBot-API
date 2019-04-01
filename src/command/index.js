const commandService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createCommand}, commandService.createCommand);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
