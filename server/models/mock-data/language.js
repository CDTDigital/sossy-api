'use strict';

const rand = require('./random');

const LANGUAGES = [
  'English',
  'Spanish',
  'Chinese',
  'Korean',
  'Tagalog',
  'Hindi',
  'Thai',
  'Khmer',
  'Vietnamese'
];

module.exports = function language() {
  return LANGUAGES[rand(LANGUAGES.length)];
};
