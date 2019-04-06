const lotteryService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createLottery}, lotteryService.createLottery);
  fastify.put('/:id', {schema: schema.updateLottery}, lotteryService.updateLottery);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
