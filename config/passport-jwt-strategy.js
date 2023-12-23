const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'createdByAvin', // this is the main encrytion and decryption key
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.userId);
  
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  });

  passport.use(jwtStrategy);

module.exports = passport;