const commandHistoryService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createCommandHistory}, commandHistoryService.createCommandHistory);
  fastify.get('/', {schema: schema.getWithFilter}, commandHistoryService.getCommandHistoryWithFilter);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
