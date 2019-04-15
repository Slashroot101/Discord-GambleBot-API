const guildService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createGuild}, guildService.createGuild);
  fastify.get('/',  {schema: schema.getGuildWithFilter}, guildService.getWithFilter);
  fastify.get('/points', {schema: schema.getGuildLeaderboard}, guildService.getGuildLeaderboard);
  fastify.delete('/:id', {schema: schema.deleteGuild}, guildService.deleteGuild);
  fastify.put('/:id', {schema: schema.updateGuild}, guildService.updateGuild);
  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
