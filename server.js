'use strict';

const env         = require('./server/config/env.js');

const fs          = require('fs');
const path        = require('path');
const express     = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const passport    = require('passport');
const jwtStrategy = require('./server/config/jwt-strategy').strategy;

const layout      = fs.readFileSync(path.resolve(__dirname, 'server/templates/layout.html')).toString();
let   server      = express();

passport.use(jwtStrategy);
server.use(passport.initialize());
server.use(bodyParser.json());
server.use(morgan('combined'));

server.port = env.port;
server.environment  = env.env;

server.use(express.static('public'));
server.get('/', (req, res) => {
  res.send(layout);
});

let authenticate = passport.authenticate('jwt', { session: false });

server.get('/protected', authenticate, function(req, res){
  res.json({hello: 'protected world'});
});


/*
 * Caching of the data in memory is so that consumers can debug and verify
 * the protected request!
 */
const mockGenerator = require('./server/models/mock-data/aggregate');
const rand          = require('./server/models/mock-data/random');

let threeMinutes = 1000 * 60 * 3
let mockGeneratedAt = new Date() - threeMinutes * 2;
let mockData = [];

function generateMockData() {
  if (mockGeneratedAt <= new Date() - threeMinutes) {
    let count = rand(10);
    mockGeneratedAt = new Date();
    mockData = [];
    for (let i = 0; i <= count; i++) {
      mockData.push(mockGenerator());
    }
  }
}

const Serializer    = require('./server/models/serializer');

function mockDataController(req, res) {
  generateMockData();
  let data = mockData.map((aggregate) => {
    return new Serializer(aggregate).toJSON();
  });
  res.json(data);
};

server.get('/mock-unprotected', mockDataController);
server.get('/mock-protected', authenticate, mockDataController);

module.exports = server;
