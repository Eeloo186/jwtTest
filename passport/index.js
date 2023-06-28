const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const google = require("./googleStrategy");
const naver = require("./naverStrategy");
const User = require("../models/user");
const Like = require("../models/like");
const jwt = require("./JWTStrategy");

module.exports = () => {
  console.log("passportConfig() 실행");
  passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserialize");

    User.findOne({
      where: { id },
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
    })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });

  local();
  kakao();
  google();
  naver();
  jwt();
};
