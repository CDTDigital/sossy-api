'use strict';

const passportJWT = require('passport-jwt');

const ExtractJwt  = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey:    process.env.JWT_SECRET
};

// NOTE: we may need to switch to having app features that manage these usernames
let authorizedUsers = [process.env.JWT_USER];

function findUser(jwtUsername) {
  let user = authorizedUsers.find((name) => {
    return name === jwtUsername;
  });

  if (!user) {
    console.log('Authorization Error: User not found');
  }

  return user || false;
}

function authorizeApiUsage(payload, next) {
  console.log('Authorization: payload found', payload);
  let user = findUser(payload.user);
  next(null, user);
}

module.exports = {
  strategy:           new JwtStrategy(jwtOptions, authorizeApiUsage),
  authorizeApiUsage:  authorizeApiUsage,
  authorizedUsers:    authorizedUsers
};
