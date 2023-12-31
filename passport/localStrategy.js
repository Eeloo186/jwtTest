const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

const passportConfig = {
  usernameField: "userId",
  passwordField: "password",
  passReqToCallback: false,
};
const passportVerify = async (userId, password, done) => {
  try {
    const exUser = await User.findOne({ where: { userId } });
    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        done(null, exUser);
      } else {
        done(null, false, { message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      done(null, false, { message: "가입되지 않은 회원입니다." });
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  console.log("local() 실행");
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
};
