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
    return Object.assign(
      {},
      this.aggregate.voterPreference,
      {voter_language: this.aggregate.voterPreference.language}
    );
  }

  mapApplication() {
    return Object.assign(
      {},
      this.aggregate.application,
      {application_language: this.aggregate.application.language}
    );
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
