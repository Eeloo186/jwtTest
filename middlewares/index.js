const passport = require("passport");
const generateToken = require("../utils/generateToken");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/page/login");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

// 관리자 여부 조사
exports.isAdmin = (req, res, next) => {
  // id 받아서 등급 조사로 admin 여부 구해옴
};
exports.isNotAdmin = (req, res, next) => {};

exports.verifyToken = (req, res, next) => {
  req.headers["Authorization"] = `${req.cookies["access_token"]}`;
  passport.authenticate("jwt", { sessions: false }, (error, user, id) => {
    console.log(`::::::::::::::::>>>>>>>>>>>> ${error}`);
    console.log(`::::::::::::::::>>>>>>>>>>>>`, id);
    if (id) {
      res.clearCookie("access_token");
      res.cookie("access_token", generateToken(id), {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
    }
    // console.log("-----------------------1--------------------------");
    // console.log("-----------------------2--------------------------");
    // console.log("-----------------------3--------------------------");
    // console.log(error);
    // console.log(user);
    // console.log("-----------------------4--------------------------");
    // console.log("-----------------------5--------------------------");
    // console.log("-----------------------6--------------------------");
    res.locals.user = req.user = user;
    res.locals.likedPostList = req.user?.Likes?.map((f) => f.PostId) || [];
    if (req.user) {
      next();
    } else {
      res.redirect("/page/login");
    }
  })(req, res, next);
};
