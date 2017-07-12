'use strict';

const server = require('./server');

server.start(() => {
  console.log('Starting server in ' + server.environment + ' mode: Listening on ' + server.port);
});
