'use strict';

let request   = require('request-promise');
let jwt       = require('jsonwebtoken');

let env       = require('../../support/env');
let server    = require('../../../server');

const secret  = process.env.JWT_SECRET;

function serverUrl(path) {
  return `http://localhost:${server.port}${path}`;
}

function visitUnprotected(path) {
  return request(serverUrl(path));
}

function visitWithGoodCredentials(path) {
  let username = process.env.JWT_USER;
  let token = jwt.sign({user: username}, secret);

  return request({
    uri: serverUrl(path),
    headers: {Authorization: `JWT ${token}`}
  });
}

function visitWithBadCredentials(path) {
  let token = jwt.sign({user: 'NOPE'}, secret);

  return request({
    uri: serverUrl(path),
    headers: {Authorization: `JWT ${token}`}
  });
}

module.exports = function setup(callback) {
  server.start((listener) => {
    callback({
      server: listener,
      visitUnprotected: visitUnprotected,
      visitWithGoodCredentials: visitWithGoodCredentials,
      visitWithBadCredentials: visitWithBadCredentials
    });
  });
};
