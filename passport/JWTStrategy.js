const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
  // algorithms: ["HS256"],
  //   passReqToCallback: true --> verify(request, jwt_payload, done_callback)
};
const verify = (payload, done) => {
  console.log("----------------------- paylaod ----------------- ");
  console.log(payload);
  console.log("------------------------------------------------- ");

  done(false, "test");
};

module.exports = () => {
  console.log("jwt() 실행");
  passport.use(new Strategy(options, verify));
};
