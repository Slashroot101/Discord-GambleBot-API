const lotteryService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createLottery}, lotteryService.createLottery);
  fastify.put('/:id', {schema: schema.updateLottery}, lotteryService.updateLottery);
  fastify.get('/', {schema: schema.getWithFilter}, lotteryService.getWithFilter);
  fastify.put('/:id/winner', {schema: schema.pickAndSetWinner}, lotteryService.pickAndSetWinner);
  fastify.put('/:id/ticket', {schema: schema.addTickets}, lotteryService.addTickets);

  fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error)
  });

  next();
};
