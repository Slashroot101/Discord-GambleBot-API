const userService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.put('/:id', {schema: schema.updateRole}, userService.updateRole);
  fastify.post('/', {schema: schema.createRole}, userService.createRole);
  fastify.get('/', {schema: schema.getRoleWithFilter}, userService.getRoleWithFilter);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
