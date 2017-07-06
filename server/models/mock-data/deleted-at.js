'use strict';

const faker = require('faker');
const rand = require('./random');

module.exports = function deletedAt() {
  let flag = !!rand();
  if (!flag) { return; }
  return faker.date.recent();
};
