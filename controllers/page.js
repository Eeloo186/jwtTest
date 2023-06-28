const express = require("express");
const { reformatDate } = require("../utils");
const { User, Post, Board, Content, Comment, Like } = require("../models");

exports.renderMain = async (req, res, next) => {
  console.log("renderMain 진입");
  try {
    const kakao = process.env.KAKAO_ID;
    const posts = await Post.findAll({
      order: [["view", "DESC"]],
      limit: 5,
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
    });

    res.render("main", {
      title: "메인페이지",
      twits: posts,
      boardName: "main",
      user: req.user,
      kakao,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderNotice = async (req, res, next) => {
  // const page = req.query.currentPage;
  try {
    // const posts = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["userId", "nickname"],
    //     },
    //     {
    //       model: Board,
    //       attributes: ["name"],
    //       where: { name: "notice" },
    //     },
    //     {
    //       model: Content,
    //       attributes: ["content"],
    //     },
    //   ],
    //   limit: 10,
    //   offset: (page - 1) * 10,
    // });

    // const postsCount = await Post.findAndCountAll({
    //   nest: false,
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["userId", "nickname"],
    //     },
    //     {
    //       model: Board,
    //       attributes: ["name"],
    //       where: { name: "notice" },
    //     },
    //     {
    //       model: Content,
    //       attributes: ["id", "content"],
    //     },
    //   ],
    //   limit: 10,
    //   offset: page * 10,
    // });

    // const { count } = postsCount;
    // let limit = 10;

    // const pagingData = getPagingDataCount(count, page, limit);

    // // DB createdAt에 들어있는 Date 정보 커스터마이징
    // posts.forEach((post) => {
    //   let date = post["dataValues"]["createdAt"];
    //   post["dataValues"][
    //     "createdAt"
    //   ] = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    // });

    res.render("notice", {
      title: "공지사항페이지",
      // twits: posts,
      boardName: "notice",
      // pagingData,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderInfo = async (req, res, next) => {
  // const page = req.query.currentPage;
  try {
    // const posts = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["userId", "nickname"],
    //     },
    //     {
    //       model: Board,
    //       attributes: ["name"],
    //       where: { name: "info" },
    //     },
    //     {
    //       model: Content,
    //       attributes: ["content"],
    //     },
    //   ],
    //   limit: 10,
    //   offset: (page - 1) * 10,
    // });

    // const postsCount = await Post.findAndCountAll({
    //   nest: false,
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["userId", "nickname"],
    //     },
    //     {
    //       model: Board,
    //       attributes: ["name"],
    //       where: { name: "info" },
    //     },
    //     {
    //       model: Content,
    //       attributes: ["id", "content"],
    //     },
    //   ],
    //   limit: 10,
    //   offset: page * 10,
    // });

    // const { count } = postsCount;
    // let limit = 10;

    // const pagingData = getPagingDataCount(count, page, limit);

    // // DB createdAt에 들어있는 Date 정보 커스터마이징
    // posts.forEach((post) => {
    //   let date = post["dataValues"]["createdAt"];
    //   post["dataValues"][
    //     "createdAt"
    //   ] = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    // });

    res.render("info", {
      title: "정보페이지",
      // twits: posts,
      boardName: "info",
      // pagingData,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// exports.renderCommunityView = async (req, res, next) => {
//   const { postId } = req.params;
//   try {
//     // 게시글 정보 가져옴
//     const post = await Post.findOne({
//       include: [
//         {
//           model: User,
//           attributes: ["userId", "nickname"],
//         },
//         {
//           model: Board,
//           attributes: ["name"],
//         },
//         {
//           model: Content,
//           attributes: ["content"],
//         },
//       ],
//       where: {
//         id: postId,
//       },
//     });

//     // 댓글 정보 가져옴
//     const comments = await Comment.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["id", "userId", "nickname"],
//         },
//         {
//           model: Post,
//           attributes: ["id"],
//           where: { id: postId },
//         }
//       ]
//     });

//     // 날짜를 필요한 형태로 바꿈
//     reformatDate(post, "full");
//     comments.forEach((comment) => {
//       reformatDate(comment, "full");
//     })

//     // 해당 게시글의 조회수 +1 처리
//     await Post.update({
//       view: post.view + 1,
//     }, {
//       where: { id: postId},
//     });

//     res.render("communityView", {
//       title: "메인페이지",
//       twit: post,
//       comments,
//       boardName: "communityView",
//       postId: postId,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

exports.renderPostDetail = async (req, res, next) => {
  const { boardName, postId } = req.params;
  try {
    // 게시글 정보 가져옴
    const post = await Post.findOne({
      include: [
        {
          model: User,
          attributes: ["id", "userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
      where: {
        id: postId,
      },
    });

    // 댓글 정보 가져옴
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "userId", "nickname"],
        },
        {
          model: Post,
          attributes: ["id"],
          where: { id: postId },
        },
      ],
    });

    // 추천 정보 가져옴
    const likeCount = await Like.count({
      where: { PostId: postId },
    });
    //댓글 개수
    const comment = await Comment.count({
      where: { PostId: post.id },
    });

    // 날짜를 필요한 형태로 바꿈
    reformatDate(post, "full");
    comments.forEach((comment) => {
      reformatDate(comment, "full");
    });

    // 해당 게시글의 조회수 +1 처리
    await Post.update(
      {
        view: post.view + 1,
      },
      {
        where: { id: postId },
      }
    );
    // findOne으로 가져왔던 post의 조회수도 +1로 갱신
    post.view += 1;

    console.log(JSON.stringify(post));
    let renderPage = "";
    if(boardName == "picture"){
      renderPage = "pictureDetail"
    } else {
      renderPage = "postDetail"
    }
    res.render(renderPage, {
      title: "게시글 상세 정보",
      twit: post,
      comments,
      boardName,
      postId: postId,
      likeCount,
      comment,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderCommunity = async (req, res, next) => {
  // const page = req.query.currentPage;
  try {
    //   const posts = await Post.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ["userId", "nickname"],
    //       },
    //       {
    //         model: Board,
    //         attributes: ["name"],
    //         where: { name: "community" },
    //       },
    //       {
    //         model: Content,
    //         attributes: ["content"],
    //       },
    //     ],
    //     limit: 10,
    //     offset: (page - 1) * 10,
    //   });
    //   //console.log(posts);

    //   const postsCount = await Post.findAndCountAll({
    //     nest: false,
    //     include: [
    //       {
    //         model: User,
    //         attributes: ["userId", "nickname"],
    //       },
    //       {
    //         model: Board,
    //         attributes: ["name"],
    //         where: { name: "community" },
    //       },
    //       {
    //         model: Content,
    //         attributes: ["id", "content"],
    //       },
    //     ],
    //     limit: 10,
    //     offset: page * 10,
    //   });

    //   const { count } = postsCount;
    //   let limit = 10;

    //   const pagingData = getPagingDataCount(count, page, limit);

    //   // DB createdAt에 들어있는 Date 정보 커스터마이징
    //   posts.forEach((post) => {
    //     let date = post["dataValues"]["createdAt"];
    //     post["dataValues"][
    //       "createdAt"
    //     ] = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    res.render("community", {
      title: "커뮤니티페이지",
      boardName: "community",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

getPagingDataCount = (totalItems, page, limit) => {
  const currentPage = page ? page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  const pnStart = (Math.ceil(page / limit) - 1) * limit + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
  let pnEnd = pnStart + limit; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
  if (pnEnd > totalPages) pnEnd = totalPages; // NOTE: 페이지네이션의 끝 번호가 페이지네이션 전체 카운트보다 높을 경우.

  return { totalItems, totalPages, currentPage, pnStart, pnEnd };
};

exports.renderLogin = (req, res) => {
  res.cookie("prevUrl", req.body.currUrl);
  // req.session.prevUrl = req.body.currUrl;
  // console.log('---------------------------');
  // console.log(req.session.prevUrl);
  // console.log('---------------------------');
  res.render("login", { title: "로그인 페이지" });
};

exports.renderJoin = async (req, res, next) => {
  try {
    res.render("join", {
      title: "회원가입",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderEditor = async (req, res) => {
  // req.query로 변수 초기화
  const boardName = req.query["board-name"];
  let postTitle = "";
  let content = "";
  let type = "write";
  let postId = "";
  console.log(req.query.postId);
  if (req.query.postId) {
    // 게시글 수정(=postId 정보가 있음)
    postId = req.query.postId;

    // postId로 title과 content 구한다
    const postRow = await Post.findOne({
      where: { id: postId },
    });
    const contentRow = await Content.findOne({
      where: { PostId: postId },
    });
    postTitle = postRow.dataValues.title;
    content = contentRow.dataValues.content;
    type = "edit";
  }

  res.render("editor", {
    title: "글쓰기(에디터) 페이지",
    postId,
    boardName,
    postTitle,
    content,
    type,
  });
};

exports.renderPictureEditor = async (req, res) => {
  // req.query로 변수 초기화
  const boardName = req.query["board-name"];
  let postTitle = "";
  let content = "";
  let type = "write";
  let postId = "";

  if (req.query.postId) {
    // 게시글 수정(=postId 정보가 있음)
    postId = req.query.postId;

    // postId로 title과 content 구한다
    const postRow = await Post.findOne({
      where: { id: postId },
    });
    const contentRow = await Content.findOne({
      where: { PostId: postId },
    });
    postTitle = postRow.dataValues.title;
    content = contentRow.dataValues.content;
    type = "edit";
  }

  res.render("pictureEditor", {
    title: "사진(에디터) 페이지",
    postId,
    boardName,
    postTitle,
    content,
    type,
  });
};

exports.renderMypage = async (req, res,next) => {
  try {
    // const users = User.findAll();
    // users.forEach((user)=>{
    //   reformatDate(user,'full')
    // });

    const postCount = await User.count({
      include: [
        {
          model: Post,
          where: {UserId: req.user.id},
        }
      ]
    });
    console.log(`${req.user.id}유저의 게시글 수는 ${postCount}개`);

    // const count = await Post.count({
    //   include: [
    //     {
    //       model: Board,
    //       where: { name: boardName }, 
    //     },
    //   ],
    // });


    const commentCount = await User.count({
      include: [
        {
          model: Comment,
          where: {UserId: req.user.id},

        }
      ]
    });

    console.log(`${req.user.id}유저의 댓글 수는 ${commentCount}개`);


  res.render("mypage", {
    postCount,
    commentCount,
  });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


exports.renderModifyUser = async (req, res, next) => {
  console.log("-------------------------------------------------------");
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    // console.log(user);
    //console.log('----------------------------');
    // console.log(req.user["dataValues"]["id"]);
    // console.log(req.user.id);
    //console.log(user);
    //console.log('----------------------------');
    res.render("modify", {
      title: "회원정보수정",
      user: user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderAdminpost = async (req, res, next) => {
  console.log("admin/post 진입");
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
    });
    posts.forEach((post)=>{
      reformatDate(post, "full")
    })
    res.render("admin_post", {
      title: "게시글관리 페이지",
      twits: posts,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderMember = async (req, res, next) => {
  console.log("admin/member 진입");
  try {
    const users = await User.findAll();
    users.forEach((user)=>{
      reformatDate(user,'full')
    });
    res.render("admin_member", {
      title: "회원관리 페이지",
      users: users,

    });

  } catch (err) {
    console.error(err);
    next(err);
  }
};

//
exports.renderAdminnotice = async (req, res, next) => {
  console.log("admin/notice 진입");
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
        {
          model: Board,
          attributes: ["name"],
          where: { name: "notice" },
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
    });
    posts.forEach((post)=> {
      reformatDate(post, "full")
    });
    res.render("admin_notice", {
      title: "공지사항",
      twits: posts,
      boardName: "notice",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
// exports.renderNotice = async (req, res, next) => {
//   try {
//     const posts = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["userId", "nickname"],
//         },
//         {
//           model: Board,
//           attributes: ["name"],
//           where: {name: "notice"},
//         },
//         {
//           model: Content,
//           attributes: ["content"],
//         },
//       ],
//     })



exports.popularList = async (req, res, next) => {
  try {
    const popularList = await Post.findAll({
      order: [["view", "DESC"]],
      limit: 10,
    });
    res.json({ popularList }); // popularList를 객체 형태로 응답합니다.
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderPicture = (req, res, next) => {
  const limit = 4;
  const posts = Post.findAll({
    include: [
      {
        model: User,
        attributes: ["userId", "nickname"],
      },
      {
        model: Board,
        attributes: ["name"],
        where: { name: "picture" },
      },
      {
        model: Content,
        attributes: ["content"],
      },
      // {
      //   model: Like,
      //   attributes: ["UserId", "PostId"],
      // },
    ],
    order: [["createdAt", "DESC"]],
    limit,
  })
    .then((posts) => {
      posts.forEach((post) => {
        reformatDate(post, "full");
      });

      res.render("picture", {
        title: "사진 페이지",
        posts,
        boardName: "picture",
        limit,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.popularList = async (req, res, next) => {
  try {
    const popularList = await Post.findAll({
      order: [["view", "DESC"]],
      limit: 10,
    });
    res.json({ popularList }); // popularList를 객체 형태로 응답합니다.
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderPicture = (req, res, next) => {
  const limit = 4;
  const posts = Post.findAll({
    include: [
      {
        model: User,
        attributes: ["userId", "nickname"],
      },
      {
        model: Board,
        attributes: ["name"],
        where: { name: "picture" },
      },
      {
        model: Content,
        attributes: ["content"],
      },
      // {
      //   model: Like,
      //   attributes: ["UserId", "PostId"],
      // },
    ],
    order: [["createdAt", "DESC"]],
    limit,
  })
    .then((posts) => {
      posts.forEach((post) => {
        reformatDate(post, "full");
      });

      res.render("picture", {
        title: "사진 페이지",
        posts,
        boardName: "picture",
        limit,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
