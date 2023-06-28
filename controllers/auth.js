const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Pet } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

exports.join = async (req, res, next) => {
  const { userId, password, nickname, email, address1, address2, address3, provider, pet, petName, petType, petKind, petAge, petEtc } = req.body;
  try {
    const exUser = await User.findOne({ where: { userId } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      userId,
      password: hash,
      nickname,
      email,
      address1,
      address2,
      address3,
      provider,
      pet,
    });
    await Pet.create({
      name: petName,
      type: petType,
      kind: petKind,
      age: Number(petAge),
      etc: petEtc,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.error("없는 아이디입니다.");
      return res.status(401).send(`<script>alert('아이디가 없거나 비밀번호가 잘못되었습니다.');history.back();</script>`);
    }
    // 로그인 성공처리
    // jwt 토큰 발급
    const token = generateToken(user.id);
    console.log(`token :::::::::>> ${token}`);
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    return res.redirect("/");
    // return res.json({ code: 200, message: "테스트 토큰 발급", token });

    // req.login
    // return req.login(user, (loginError) => {
    //   if (loginError) {
    //     console.error(loginError);
    //     return next(loginError);
    //   }

    //   return res.redirect("/");
    // });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

// exports.login = (req, res, next) => {
//   passport.authenticate("local", (authError, user, info) => {
//     if (authError) {
//       console.error(authError);
//       return next(authError);
//     }
//     if (!user) {
//       console.error("없는 아이디입니다.");
//       return res.status(401).send(`<script>alert('아이디가 없거나 비밀번호가 잘못되었습니다.');history.back();</script>`);
//     }
//     return req.login(user, (loginError) => {
//       if (loginError) {
//         console.error(loginError);
//         return next(loginError);
//       }
//       console.log("-------------------------");
//       console.log(`로그인 완료 ${req.cookies.prevUrl}로 돌아갑니다`);
//       console.log("-------------------------");

//       if (req.cookies.prevUrl == "undefined") {
//         return res.redirect("/");
//       } else {
//         return res.redirect(`${req.cookies.prevUrl}`);
//       }
//     });
//   })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
// };

exports.logout = (req, res) => {
  req.logout(() => {
    // if 주소에 마이페이지 등 있음. => 메인 페이지로
    // else 주소에 마이페이지 등 없음. => 기존 페이지로
    const url = req.headers.referer;
    if (url.includes("mypage") || url.includes("admin")) {
      return res.redirect("/");
    } else {
      return res.redirect(url);
    }
    // res.redirect(req.headers.referer);
  });
};

exports.saveReturnTo = (req, res, next) => {
  req.session.returnTo = req.header("Referer") || "/";
  next();
};
