'use strict';

const env = require('../../support/env');

const expect = require('chai').expect;
const jwtStrategy = require(env.serverDir + '/config/jwt-strategy');

let authorizer = jwtStrategy.authorizeApiUsage;
let authorizedUser = jwtStrategy.authorizedUsers[0];

describe('jwtStrategy.authorizeApiUsage', function() {
  it('denies entry to unregistered user names', function(done) {
    authorizer({user: 'not-here'}, function(err, user) {
      expect(user).to.equal(false);
      done(err);
    });
  });

  it('allows users who are allowed', function(done) {
    authorizer({user: authorizedUser}, function(err, user) {
      expect(user).to.equal(authorizedUser);
      done(err);
    });
  });
});
