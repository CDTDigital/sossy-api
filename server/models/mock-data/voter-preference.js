'use strict';

const faker = require('faker');
const rand  = require('./random');
const language = require('./language');

module.exports = function voterPreference(residentId, eligibleFlag=rand()) {
  return Object.assign({
    county:         county(),
    effective_date: faker.date.recent(),
    language:       language(),
    eligible:       boolean(eligibleFlag),
    opt_out:        boolean(),
    by_mail:        boolean()
  }, party());
};

function boolean(flag) {
  if (flag !== undefined) { return !!flag; }
  return !!rand();
}


function party() {
  let partyName = getParty();
  return {
    party: partyName,
    party_write_in: partyWriteIn(partyName)
  };
}

const PARTIES = [
  'American Independent',
  'Conservative',
  'Democratic',
  'Democratic Socialist',
  'Green',
  'Libertarian',
  'Republican',
  'Working Families',
  'Other'
];

function getParty() {
  return PARTIES[rand(PARTIES.length)];
}

function partyWriteIn(partyName) {
  if (partyName !== 'Other') { return; }
  return faker.company.catchPhraseDescriptor();
}

const COUNTIES = [
  'Alameda',
  'Alpine',
  'Amador',
  'Butte',
  'Calaveras',
  'Colusa',
  'Contra Costa',
  'Del Norte',
  'El Dorado',
  'Fresno',
  'Glenn',
  'Humboldt',
  'Imperial',
  'Inyo',
  'Kern',
  'Kings',
  'Lake',
  'Lassen',
  'Los Angeles',
  'Madera',
  'Marin',
  'Mariposa',
  'Mendocino',
  'Merced',
  'Modoc',
  'Mono',
  'Monterey',
  'Napa',
  'Nevada',
  'Orange',
  'Placer',
  'Plumas',
  'Riverside',
  'Sacramento',
  'San Benito',
  'San Bernardino',
  'San Diego',
  'San Francisco',
  'San Joaquin',
  'San Luis Obispo',
  'San Mateo',
  'Santa Barbara',
  'Santa Clara',
  'Santa Cruz',
  'Shasta',
  'Sierra',
  'Siskiyou',
  'Solano',
  'Sonoma',
  'Stanislaus',
  'Sutter',
  'Tehama',
  'Trinity',
  'Tulare',
  'Tuolumne',
  'Ventura',
  'Yolo',
  'Yuba'
];

function county() {
  return COUNTIES[rand(COUNTIES.length)];
}
