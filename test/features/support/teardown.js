'use strict';

module.exports = function teardown(world, callback) {
  world.server.close(callback);
};
