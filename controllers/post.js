const { reformatDate } = require("../utils");
const { Comment, User, Post, Like } = require("../models");

exports.afterUploadImage = (req, res) => {
  console.log(req.files[0].mimetype);
  res.json({ url: `/img/${req.files[0].filename}` });
};

exports.uploadComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { commentContent, userId } = req.body;

    // 받아온 정보로 db에 댓글 정보 추가
    await Comment.create({
      content: commentContent,
      UserId: userId,
      PostId: postId,
    })
      .then(() => {
        const comment = Comment.findOne({
          include: [
            {
              model: User,
              attributes: ["id", "userId", "nickname"],
            },
          ],
          where: { UserId: userId, PostId: postId },
          order: [["createdAt", "DESC"]],
        })
          .then((comment) => {
            // 날짜를 필요한 형태로 바꿈
            reformatDate(comment, "full");
            res.json(comment);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("댓글 검색 실패");
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("댓글 등록 실패");
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteComment = (req, res, next) => {
  const { postId, commentId } = req.params;
  Comment.destroy({
    where: { id: commentId },
  })
    .then(() => {
      // 삭제 성공 시 처리
      return res.status(200).json({ postId, commentId, message: "삭제 성공" });
    })
    .catch((err) => {
      // 삭제 실패 시 처리
      return res.status(500).json({ postId, commentId, message: "삭제 실패" });
    });
};



exports.likePost = (req, res, next) => {
  const PostId = req.params.postId;
  const UserId = req.user.id;

  Like.create({
    UserId,
    PostId, 
  })
  .then(() => {
    console.log("게시글 추천 작업 성공");
    return res.status(201).json({ UserId, PostId });
  })
  .catch((err) => {
    console.log("게시글 추천 중 오류 발생");
    console.error(err);
    // return res.status(500).json({ UserId, PostId });
  });
};

exports.deletePost = (req, res, next) => {
  const PostId = req.params.postId;
  const UserId = req.user.id;

  Like.destroy({
    where: { UserId, PostId },
  })
  .then(() => {
    console.log("게시글 추천해제 작업 성공");
    return res.status(204).json({ UserId, PostId });
  })
  .catch((err) => {
    console.log("게시글 추천해제 작업 중 오류 발생");
    console.error(err);
    // return res.status(500).json({ UserId, PostId });
  });
}