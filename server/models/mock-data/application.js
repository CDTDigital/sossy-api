'use strict';

const faker       = require('faker');
const language    = require('./language');
const rand        = require('./random');

module.exports = function createApplication() {
  return {
    id:             faker.random.number(10000) + 1,
    type:           ['dl', 'id', 'coa'][rand(3)],
    source:         ['online', 'mail', 'field'][rand(3)],
    number:         faker.random.alphaNumeric(8),
    first_name:     faker.name.firstName(),
    middle_name:    faker.name.firstName(),
    last_name:      faker.name.lastName(),
    name_suffix:    faker.name.suffix(),
    date_of_birth:  faker.date.past(90),
    language:       language(),
    created_at:     faker.date.past(5),
    updated_at:     faker.date.past(1)
  };
};


