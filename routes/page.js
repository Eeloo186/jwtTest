const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, verifyToken } = require("../middlewares");

const {
  renderMain,
  renderNotice,
  renderInfo,
  renderPicture,
  renderCommunity,
  renderCommunityView,
  renderPostDetail,
  renderLogin,
  renderJoin,
  renderEditor,
  renderPictureEditor,
  renderMypage,
  renderModifyUser,
  renderAdminpost,
  renderMember,
  highViewList,
  rowViewList,
  newestList,
  oldList,
  renderAdminnotice,
} = require("../controllers/page");

router.use((req, res, next) => {
  // req.user를 통해 암호화된 password 등 불필요한 정보가
  // 브라우저에 유출되지 않도록
  // 필요한 정보만 저장하는 방식으로 변경할 필요성이 있음
  res.locals.user = req.user;
  res.locals.likedPostList = req.user?.Likes?.map((f) => f.PostId) || [];
  next();
});

// 메인 페이지
router.get("/", verifyToken, renderMain);

// 로그인 페이지
router.get("/page/login", renderLogin);
router.post("/page/login", renderLogin);

// 회원 가입 페이지
router.get("/page/join", renderJoin);

// 공지사항 페이지
router.get("/page/notice", renderNotice);

// 정보제공 페이지
router.get("/page/info", renderInfo);

// 사진게시판 페이지
router.get("/page/picture", renderPicture);

// 커뮤니티 페이지
router.get("/page/community", renderCommunity);

// 글쓰기(에디터) 페이지
router.get("/page/editor", isLoggedIn, renderEditor);
router.get("/page/pictureEditor", isLoggedIn, renderPictureEditor);

// router.get("/page/editor/:postId");

// 마이페이지
router.get("/page/mypage", isLoggedIn, renderMypage);

router.get("/page/admin_post", isLoggedIn, renderAdminpost);

router.get("/page/admin_member", isLoggedIn, renderMember);
router.get("/page/admin_notice", isLoggedIn, renderAdminnotice);

// 유저정보 수정 페이지
router.get("/page/users/:id", isLoggedIn, renderModifyUser);

// 개별 상세보기 페이지
// router.get("/page/communityView/:postId", renderCommunityView);
router.get("/page/:boardName/:postId", renderPostDetail);

module.exports = router;
