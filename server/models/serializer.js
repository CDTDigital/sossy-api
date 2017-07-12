'use strict';

const stateDescription = require('./state-description');

class Serializer {
  constructor(aggregate) {
    this.aggregate = aggregate;
  }

  flattenedAddresses() {
    return Object.assign({},
      this.addressFor('mailing'),
      this.addressFor('new_mailing'),
      this.addressFor('residence'),
      this.addressFor('new_residence')
    );
  }

  addressFor(name) {
    if (!this.aggregate.addresses[name]) {
      return {};
    }
    return this.reKeyAddress(this.aggregate.addresses[name], name);
  }

  reKeyAddress(original, name) {
    let address = {};

    address[name + '_street']     = original.street_address;
    address[name + '_city']       = original.city;
    address[name + '_state']      = original.state;
    address[name + '_zip']        = original.zip;
    address[name + '_state_name'] = stateDescription(original.state);

    return address;
  }

  mapVoterPrefs() {
    let prefs = Object.assign(
      {},
      this.aggregate.voterPreference,
      {voter_language: this.aggregate.voterPreference.language}
    );

    delete prefs.eligible;

    return prefs;
  }

  mapApplication() {
    let app = Object.assign(
      {},
      this.aggregate.application,
      {application_language: this.aggregate.application.language}
    );

    delete app.type;

    let numberOfAddresses = Object.keys(this.aggregate.addresses).length;

    app.coa = numberOfAddresses > 2;
    app.process_date = app.updated_at.toDateString();
    app.process_time = app.updated_at.toTimeString();

    return app;
  }

  mapEmail() {
    return {
      email: this.aggregate.emails[0].address,
      email_deleted: !!this.aggregate.emails[0].deleted_at
    };
  }

  mapPhones() {
    return {
      phone: this.aggregate.phones[0].number,
      phone_deleted: !!this.aggregate.phones[0].deleted_at
    };
  }

  toJSON() {
    return Object.assign(
      {},
      this.mapVoterPrefs(),
      this.mapApplication(),
      this.flattenedAddresses(),
      this.mapEmail(),
      this.mapPhones()
    );
  }
}

module.exports = Serializer;
