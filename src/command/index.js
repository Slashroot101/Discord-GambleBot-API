const commandService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createCommand}, commandService.createCommand);
  fastify.get('/', {schema: schema.getCommandWithFilter}, commandService.getCommandWithFilter);


  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
