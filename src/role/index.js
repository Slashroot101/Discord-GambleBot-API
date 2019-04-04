const userService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {

  fastify.post('/', {schema: schema.createRole}, userService.createRole);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
