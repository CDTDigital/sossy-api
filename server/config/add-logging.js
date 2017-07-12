'use strict';

const fs     = require('fs');
const path   = require('path');
const morgan = require('morgan');

module.exports = function addLogging(server, env) {
  let stream = process.stdout;

  if (env.env === 'test') {
    stream = fs.createWriteStream(
      path.join(__dirname, '..', '..', 'log', 'test.log'),
      {flags: 'a'}
    );
  }

  server.use(morgan('combined', {stream: stream}));
};
