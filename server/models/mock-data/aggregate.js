'use strict';

const application = require('./application');
const address     = require('./address');
const email       = require('./email');
const phone       = require('./phone-number');
const voterPreference   = require('./voter-preference');
const rand              = require('./random');

module.exports = function aggregate() {
  let app = application();
  return {
    application: app,
    addresses: addresses(app.id),
    emails: [email(app.id)],
    phones: [phone(app.id)],
    voterPreference: voterPreference(app.id)
  };
};

const baseTypes = ['mailing', 'residence'];

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

function addresses(id) {
  let baseTypes = ['mailing', 'residence'];
  let count = rand(4) + 1;
  let types = shuffle(baseTypes).concat(shuffle(baseTypes));
  let collection = {};
  let i;
  for (i = 0; i < count; i++) {
    let type = types[i];
    let key = i < 2 ? type : `new_${type}`;
    collection[key] = address(type, id);
  }

  return collection;
}
