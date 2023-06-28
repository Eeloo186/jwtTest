// 라우트 분류전 임시 사용 공간
const { User, Post, Hashtag, Board, Content } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.renderLogin = (req, res) => {
  res.render("login", { title: "로그인페이지" });
};



exports.renderUploadTest = (req, res, next) => {
  try {
    console.log("컨트롤러 내부");
    console.log(req.body.content);
    ///////////////////////////////////////////////
    ////////////// db에 content 등록 //////////////
    ////////////// content 이외의 데이터 필요함 ///
    ///////////////////////////////////////////////
    res.status(200).send("본문 내용 DB에 저장 완료");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
