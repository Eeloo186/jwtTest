// 필요 모듈들 포함
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

// 초기 설정 init
dotenv.config();

// 라우트 포함 (추후 라우트 분류하면서 수정 필요함)
// const pageRouter = require("./routes/page");
// const authRouter = require("./routes/auth");
// const postRouter = require("./routes/post");
// const userRouter = require("./routes/user");

// sequelize, passport
const { sequelize } = require("./models");
const passportConfig = require("./passport");

const app = express();
passportConfig(); // 패스포트 설정

app.set("port", process.env.PORT || 8001); // 포트 설정
app.set("view engine", "html"); // view engine -> nunjucks
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false }) // sequelize db-model sync
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

///////////////////////////////////////
////////////  기본세팅  ///////////////
///////////////////////////////////////
app.use(morgan("dev")); // 배포시 dev 수정 필요
app.use(express.static(path.join(__dirname, "public"))); // static 경로 설정
app.use("/img", express.static(path.join(__dirname, "uploads"))); // '/'로 접근시 public으로, '/img'로 접근시 uploads로

app.use(express.static("public", { maxAge: "1d", immutable: true })); //뒤로가기 했을 때 캐시 제어 후 바뀐 데이터 가져오는 코드
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use((req, res, next) => {
  req.headers["Authorization"] = `Bearer ${process.env.JWT_SECRET_KEY}`;
  next();
});

// body-parser 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie-parser, session 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// passport 설정
console.log("passport 초기화 실행");
app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// 라우터 사용 선언 (추후 라우트 분류하면서 수정 필요함)
// app.use("/", pageRouter);
// app.use("/auth", authRouter);
// app.use("/post", postRouter);
// app.use("/user", userRouter);
app.use(require("./routes"));

// 요청을 처리할 라우터가 없을 경우
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
// error정보를 담아 error.html render
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// port listen
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
