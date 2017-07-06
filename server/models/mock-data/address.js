'use strict';

const rand  = require('./random');
const faker = require('faker');

module.exports = function createAddress(type, residentId) {
  return {
    resident_id: residentId || faker.random.number(8),
    type: type || ['mailing', 'residence'][rand()],
    street_address: faker.address.streetAddress(),
    city:           faker.address.city(),
    state:          state(type),
    zip:            faker.address.zipCode()
  };
};

function state(type) {
  return type === 'residence' ? 'CA' : faker.address.stateAbbr();
}
