const { Board, Post, Content, User, Like, Comment } = require("../models");
const { reformatDate } = require("../utils");
const { Op } = require("sequelize");

exports.uploadPost = async (req, res, next) => {
  try {
    console.log(req.body);
    const { boardName, title, content, imgUrl } = req.body;

    // 게시판이름으로 게시판ID 찾아서 저장
    const board = await Board.findOne({ where: { name: boardName } });
    console.log(board);
    // posts 테이블에 데이터 저장
    const post = await Post.create({
      title,
      BoardId: board.id,
      UserId: req.user.id,
      imgUrl,
    });

    // contents 테이블에 데이터 저장
    const contentHTML = await Content.create({
      content,
      PostId: post.id,
    });
    return res.status(200).end();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const { boardName, title, content, postId } = req.body;
    console.log(`게시글 ${postId}번을 수정합니다`);
    // posts 테이블에 데이터 수정
    await Post.update(
      {
        title: title,
        updatedAt: new Date(),
      },
      {
        where: { id: postId },
      }
    );

    // contents 테이블에 데이터 수정
    await Content.update(
      {
        content: content,
        updatedAt: new Date(),
      },
      {
        where: { PostId: postId },
      }
    );

    return res.status(200).end();
  } catch (err) {
    console.error(err);
  }
};

exports.deletePost = (req, res, next) => {
  console.log("게시글 삭제 시작");
  const { boardName, postId } = req.params;
  console.log(`게시글ID : ${postId}`);
  console.log(`게시판이름ID : ${boardName}`);
  // 게시글 삭제
  // postId로 Post테이블에서 삭제할 행 검색

  // DB에서 물리적인 삭제가 아닌 deleteAt을 통한 논리적인 삭제 방식이
  // 적용되어있기 때문에 posts 테이블과 연관된 테이블들의 데이터 삭제를
  // 위해서는 수동으로 찾아서 삭제해줄 필요가 있다.
  // 이 과정에서 일부 작업만 성공하고 끝나버리는 문제를 막기 위해
  // 트랜잭션을 도입해서 처리해야한다.
  // 혹은 물리적인 삭제로 변경해야한다. 이 경우 삭제된 정보 복구를 위해서는
  // 삭제와 동시에 백업용 테이블에 정보를 옮겨둘 필요가 있다.

  // 지금은 paranoid: false로 변경해 물리적 삭제로 변경해서 문제를 해결
  Post.destroy({
    where: { id: postId },
  })
    .then(() => {
      console.log("게시글 삭제 성공");
      res.status(200).json({ boardName });
    })
    .catch((err) => {
      console.log("게시글 삭제 중 오류 발생");
      console.error(err);
      next(err);
    });
};

exports.totalPage = async (req, res, next) => {  
  const { boardName,  } = req.params;  
  try {
    const count = await Post.count({
      include: [
        {
          model: Board,
          where: { name: boardName }, 
        },
      ],
    });
   
    const totalPages = Math.ceil(count / 5);
    res.json(totalPages);
  } catch (err) {
    console.error(err);
    next();
  }
};

exports.sortPost = async (req, res, next) => {
  const { boardName,  } = req.params;
  const board = await Board.findOne({ where: { name: boardName } });
  console.log(`boardID는 ${board.id}`);
  console.log(`page값은 ${req.query.page}`);
  // page 정보가 있으면(=커뮤니티 페이지)
  if (req.query.page) {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    let order = [];
    switch (req.query.sortType) {
      case "newest":
        order = [["id", "DESC"]];
        break;
      case "old":
        order = [["id", "ASC"]];
        break;
      case "highView":
        order = [["view", "DESC"]];
        break;
      case "rowView":
        order = [["view"]];
        break;
      default:
        order = [["id", "DESC"]];
        break;
    }

    try {
      const posts = await Post.findAll({
        order: order,
        include: [
          {
            model: User,
            attributes: ["userId", "nickname"],
          },
        ],
        where: {
          boardId: board.id,
        },
        limit,
        offset,
      });
      posts.forEach((data) => {
        reformatDate(data, "full");
      });

      const postsWithLikeCount = await Promise.all(
        posts.map(async (post) => {
          const likeCount = await Like.count({ where: { PostId: post.id } });
          const comment = await Comment.count({ where: { PostId: post.id } });
          return { ...post.toJSON(), likeCount, comment };
        })
      );

      res.json(postsWithLikeCount);
    } catch (err) {
      console.error(err);
      next();
    }
  } else {
    // page 정보가 없으면(=사진 페이지)
    const limit = parseInt(req.query.reqPostCount);
    const offset = parseInt(req.query.picCount);
    console.log('-----------------------------------');
    console.log(`offset값은 ${offset}`);
    console.log('-----------------------------------');

    let order = [];
    switch (req.query.sortType) {
      case "newest":
        order = [["id", "DESC"]];
        break;
      case "old":
        order = [["id", "ASC"]];
        break;
      case "highView":
        order = [["view", "DESC"]];
        break;
      case "rowView":
        order = [["view"]];
        break;
      default:
        order = [["id", "DESC"]];
        break;
    }
    try {
      const posts = await Post.findAll({
        order: order,
        include: [
          {
            model: User,
            attributes: ["userId", "nickname"],
          },
        ],
        where: {
          boardId: board.id,
        },
        limit,
        offset,
      });
      posts.forEach((data) => {
        reformatDate(data, "full");
      });

      const postsWithLikeCount = await Promise.all(
        posts.map(async (post) => {
          const likeCount = await Like.count({ where: { PostId: post.id } });
          const comment = await Comment.count({ where: { PostId: post.id } });
          return { ...post.toJSON(), likeCount, comment };
        })
      );

      res.json(postsWithLikeCount);
    } catch (err) {
      console.error(err);
      next();
    }
  }
};

//검색기능 구현 코드
exports.searchPost = async (req, res) => {
  const { searchType, searchQuery } = req.query;

  try {
    let posts;
    switch (searchType) {
      case "title":
        posts = await Post.findAll({
          where: {
            title: { [Op.like]: `%${searchQuery}%` },
          },
          include: [{ model: User, attributes: ["nickname"] }],
          order: [["id", "DESC"]],
        });
        break;
      case "titleDetail":
        posts = await Post.findAll({
          where: {
            [Op.or]: [
              { title: { [Op.like]: `%${searchQuery}%` } },
              {
                "$Content.content$": {
                  [Op.like]: `%${searchQuery}%`,
                },
              },
            ],
          },
          include: [
            { model: User, attributes: ["nickname"] },
            { model: Content, attributes: [] },
          ],
          order: [["id", "DESC"]],
        });
        break;

      case "nickname":
        posts = await Post.findAll({
          include: [
            {
              model: User,
              attributes: ["nickname"],
              where: { nickname: { [Op.like]: `%${searchQuery}%` } },
            },
          ],
          order: [["id", "DESC"]],
        });
        break;
      default:
        posts = await Post.findAll({
          where: {
            [Op.or]: [{ title: { [Op.like]: `%${searchQuery}%` } }, { content: { [Op.like]: `%${searchQuery}%` } }],
          },
          include: [{ model: User, attributes: ["nickname"] }],
          order: [["id", "DESC"]],
        });
        break;
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.searchPost = async (req, res) => {
//   const { boardName } = req.params;
//   const { searchType, searchValue } = req.query;

//   try {
//     let posts;
//     switch (searchType) {
//       case "title":
//         posts = await Post.findAll({
//           where: { boardName, title: { [Op.like]: `%${searchValue}%` } },
//           include: [{ model: User, attributes: ["userId", "nickname"] }],
//           order: [["id", "DESC"]],
//         });
//         break;
//       case "titleDetail":
//         posts = await Post.findAll({
//           where: {
//             boardName,
//             [Op.or]: [
//               { title: { [Op.like]: `%${searchValue}%` } },
//               { content: { [Op.like]: `%${searchValue}%` } },
//             ],
//           },
//           include: [{ model: User, attributes: ["userId", "nickname"] }],
//           order: [["id", "DESC"]],
//         });
//         break;
//       case "nickname":
//         posts = await Post.findAll({
//           where: { boardName },
//           include: [
//             {
//               model: User,
//               attributes: ["userId", "nickname"],
//               where: { nickname: { [Op.like]: `%${searchValue}%` } },
//             },
//           ],
//           order: [["id", "DESC"]],
//         });
//         break;
//       default:
//         posts = await Post.findAll({
//           where: { boardName },
//           include: [{ model: User, attributes: ["userId", "nickname"] }],
//           order: [["id", "DESC"]],
//         });
//         break;
//     }

//     res.json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
