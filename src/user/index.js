const userService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createUser}, userService.createUser);
  fastify.get('/', {schema: schema.getUserWithFilter}, userService.getUserWithFilter);
  fastify.delete('/:id', {schema: schema.deleteUser}, userService.deleteUser);
  fastify.get('/points', {schema: schema.getUserLeaderboard}, userService.getUserLeaderboard);
  fastify.put('/:userID/command/:commandID/points', {schema: schema.addPointsToUser}, userService.addPointsToUser);
  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
