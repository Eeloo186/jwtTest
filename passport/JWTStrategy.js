const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt");
const bcrypt = require("bcrypt");
const { User, Like } = require("../models");

const generateToken = require("../utils/generateToken");

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
  secretOrKey: process.env.JWT_SECRET_KEY,
  // algorithms: ["HS256"],
  //   passReqToCallback: true --> verify(request, jwt_payload, done_callback)
};
const verify = async (payload, done) => {
  console.log("-----------------------payload--------------------------");
  console.log(payload);
  console.log("-----------------------payload--------------------------");

  try {
    const exUser = await User.findOne({
      where: { id: payload.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        },
        {
          model: Like,
          attributes: ["UserId", "PostId"],
        },
      ],
    });
    console.log("-----------------------exUser--------------------------");
    // console.log(exUser);
    console.log("-----------------------exUser--------------------------");

    if (exUser) {
      console.log(payload.exp - Math.floor(Date.now() / 1000));
      if (payload.exp - Math.floor(Date.now() / 1000) < 50) {
        console.log("토큰 재발급");
        // res.cookie("access_token", generateToken(payload.id), {
        //   maxAge: 1000 * 60 * 60,
        //   httpOnly: true,
        // });
        done(null, exUser, payload.id);
      } else {
        done(null, exUser);
      }
    } else {
      done(null, null);
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  console.log("jwt() 실행");
  passport.use(new Strategy(options, verify));
};
