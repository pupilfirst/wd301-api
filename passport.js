const passport = require("passport");
const bcrypt = require("bcrypt");

const { User } = require("./models");
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return User.findOne({ where: { email } })
        .then(async (user) => {
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          } else {
            return done(null, user, { message: "Logged In Successfully" });
          }
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findByPk(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
