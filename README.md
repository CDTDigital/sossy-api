# Sossy API

[![Build Status](https://travis-ci.org/CDTDigital/sossy-api.svg?branch=master)](https://travis-ci.org/CDTDigital/sossy-api) [![Code Climate](https://codeclimate.com/github/CDTDigital/sossy-api/badges/gpa.svg)](https://codeclimate.com/github/CDTDigital/sossy-api) [![Test Coverage](https://codeclimate.com/github/CDTDigital/sossy-api/badges/coverage.svg)](https://codeclimate.com/github/CDTDigital/sossy-api/coverage)

This is a mock application with authentication and fake data for
delivering the motor voter data to SOS.

React, JWT authentication for the API, and fakery.

Deployed at [https://sossy-api.herokuapp.com/](https://sossy-api.herokuapp.com/).
Deploys happen automatically via github integrations. When CI passes,
the deploy goes to heroku.

## Setup

For development and test, the application uses `.env` files to populate
the environmental variables. And we use envars to ensure 12 factor
portability for our apps!

To setup your local environment copy the `.env.sample` file to `.env`:

    cp .env.sample .env

## Start the app

It is just an express app, and runs via a nmp script:

    npm start

Running it in dev mode, because as we develop we want to see updates
based on our changes!

    npm run dev

## Testing

Unit/integration tests are via [mocha](https://mochajs.org/). If using the `assert`
module is too low level. Feel free to add in some `chai` and `sinon`.

These tests can be run via an npm script:

    `npm run test:server`


