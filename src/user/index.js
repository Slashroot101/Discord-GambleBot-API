const userService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createUser}, userService.createUser);
  fastify.get('/', {schema: schema.getUserWithFilter}, userService.getUserWithFilter);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
