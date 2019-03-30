const fastify = require('fastify')({
  logger: true,
});
const swagger = require('./config/swagger');
const config = require('../config');

const start = async () => {
  try {
    fastify.register(require('fastify-mongoose'), {
      uri: config.db.host
    }, err => {
      if (err) throw err
    });
    fastify.register(require('fastify-swagger'), swagger.options);
    fastify.register(require('./user'), {prefix: '/api/users'});
    await fastify.listen(3000);
    fastify.swagger();
    fastify.log.info(`Server is listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
