'use strict';

const faker = require('faker');
const deletedAt = require('./deleted-at');

module.exports = function email(residentId, deleted=false) {
  return {
    resident_id: residentId || faker.random.number(8),
    address: faker.internet.email(),
    deleted_at: deletedAt(deleted)
  }
};
