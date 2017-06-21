# Node.js Substrate

[![Build Status](https://travis-ci.org/CDTDigital/node-substrate.svg?branch=master)](https://travis-ci.org/CDTDigital/node-substrate) [![Code Climate](https://codeclimate.com/github/CDTDigital/node-substrate/badges/gpa.svg)](https://codeclimate.com/github/CDTDigital/node-substrate)

This is a base application for quickly building node applications using
our styles, React, JWT authentication for the API, and ...

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


