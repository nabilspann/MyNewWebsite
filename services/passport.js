var passport = require("passport");
var Auth0Strategy = require("passport-auth0");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // console.log(user.id);
  // console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: keys.auth0Domain,
    clientID: keys.auth0ClientId,
    clientSecret: keys.auth0Secret,
    callbackURL: "/auth/callback",
    proxy: true
  },
  async (accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // console.log("Beforemongo");
    const existingUser = await User.findOne({ auth0Id: profile.user_id });
    if (existingUser) {
      // we already have a record with the given profile ID
      return done(null, existingUser);
    }
    const user = await new User({ auth0Id: profile.user_id }).save();
    done(null, user);
  }
);

passport.use(strategy);
