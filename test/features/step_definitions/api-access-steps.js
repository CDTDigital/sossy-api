'use strict';

const assert = require('assert');

module.exports = function(world) {
  let json, unauthorized;

  function extractData(data) {
    json = JSON.parse(data);
  };

  world.given('I visit the unprotected API endpoint', function(done) {
    world
      .visitUnprotected('/mock-unprotected')
      .then(extractData)
      .then(done)
      .catch(done);
  });

  world.then('I will see a json array of application data', function(done) {
    let keys = Object.keys(json[0]);
    assert(keys.includes('county'));
    assert(keys.includes('date_of_birth'));
    done();
  });

  world.given('I visit the protected API endpoint with the right JWT secret and username', function(done) {
    world
      .visitWithGoodCredentials('/mock-protected')
      .then(extractData)
      .then(done)
      .catch(done);
  });

  world.and('I visit the JWT test endpoint with the right secret and username', function(done) {
    world
      .visitWithGoodCredentials('/protected')
      .then(extractData)
      .then(done)
      .catch(done);
  });

  world.then('I should see a success JSON message', function(done) {
    assert.equal(json.hello, 'protected world');
    done();
  });

  world.given('I visit the protected API endpoint with the wrong JWT secret and username', function(done) {
    world
      .visitWithBadCredentials('/mock-protected')
      .catch(function(err) {
        unauthorized = err;
        done();
      });
  });

  world.then('I will get an unauthorized message', function(done) {
    assert(unauthorized);
    assert(unauthorized.message.match('Unauthorized'));
    done();
  });
};
