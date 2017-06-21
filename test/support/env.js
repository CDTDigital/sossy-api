'use strict';

process.env.APP_ENV = 'test';


const path = require('path');
const supportDir = __dirname;
const serverDir  = path.resolve(__dirname, '../../server');

require(serverDir + '/config/env');

module.exports = {
  current: process.env.APP_ENV,
  supportDir: supportDir,
  serverDir: serverDir
};
