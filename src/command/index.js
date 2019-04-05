const commandService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createCommand}, commandService.createCommand);
  fastify.get('/', {schema: schema.getCommandWithFilter}, commandService.getCommandWithFilter);
  fastify.put('/:id', {schema: schema.updateCommand}, commandService.updateCommand);
  fastify.delete('/:id', {schema: schema.deleteCommand}, commandService.deleteCommand);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
