const fastify = require('fastify')({
  logger: true,
});
const swagger = require('./config/swagger');
const config = require('../config');
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.log('Connection Established')
});

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
});

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
});

mongoose.connection.on('close', () => {
  console.log('Connection Closed')
});

mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
});


const start = async () => {
  try {
    mongoose.Promise = Promise;
    await mongoose.connect(config.db.host, {
      auth: {
        user: config.db.username,
        password: config.db.password,
        authdb: config.db.authdb,
      },
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    });
		mongoose.set('debug', true);

    fastify.register(require('fastify-swagger'), swagger.options);
    fastify.register(require('./user'), {prefix: '/api/user'});
    fastify.register(require('./command'), {prefix: '/api/command'});
    fastify.register(require('./role'), {prefix: '/api/roles'});
    fastify.register(require('./commandHistory'), {prefix: '/api/command-history'});
    fastify.register(require('./guild'), {prefix: '/api/guild'});
		fastify.register(require('./lottery'), {prefix: '/api/lottery'});
		fastify.register(require('./shortenedLinks'), {prefix: '/api/short-link'});
		fastify.register(require('./index/index.js'), {prefix: '/'});
    await fastify.listen(3000);
    fastify.swagger();
    fastify.log.info(`Server is listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
