const userService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createUser}, userService.createUser);
  fastify.get('/', {schema: schema.getUserWithFilter}, userService.getUserWithFilter);
  fastify.delete('/:id', {schema: schema.deleteUser}, userService.deleteUser);


  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
