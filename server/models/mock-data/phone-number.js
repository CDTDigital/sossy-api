'use strict';

const faker = require('faker');
const deletedAt = require('./deleted-at');

module.exports = function phoneNumber(residentId, deleted=false) {
  return {
    resident_id: residentId || faker.random.number(8),
    number: faker.phone.phoneNumber(),
    deleted_at: deletedAt(deleted)
  }
};

