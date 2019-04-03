const userService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
