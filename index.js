'use strict';

const server = require('./server');

server.listen(server.port, () => {
  console.log('Starting server in ' + server.environment + ' mode: Listening on ' + server.port);
});
