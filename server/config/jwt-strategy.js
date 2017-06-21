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
  return authorizedUsers.find((name) => {
    return name === jwtUsername;
  }) || false;
}

function authorizeApiUsage(payload, next) {
  let user = findUser(payload.user);
  next(null, user);
}

module.exports = {
  strategy:           new JwtStrategy(jwtOptions, authorizeApiUsage),
  authorizeApiUsage:  authorizeApiUsage,
  authorizedUsers:    authorizedUsers
};
