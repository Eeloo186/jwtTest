const { User, Post, Content, Pet } = require("../models");

exports.checkUser = async (req, res) => {
  try {
    if (Object.keys(req.query)[0] == "userId") {
      const userId = req.query.userId;
      const user = await User.findOne({ where: { userId: userId } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    } else if (Object.keys(req.query)[0] == "nickname") {
      const nickname = req.query.nickname;
      const user = await User.findOne({ where: { nickname: nickname } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPost = async (req, res, next) => {
  console.log(req.user.id);
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userId", "nickname"],
          where: { id: req.user.id },
        },
        {
          model: Content,
          attributes: ["content"],
        },
      ],
    });
    res.json({
      posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.editUser = async (req, res, next) => {
  const {
    id,
    nickname,
    userId,
    email,
    address1,
    address2,
    address3,
    pet,
    petName,
    petType,
    petKind,
    petAge,
    petEtc,
  } = req.body;
  console.log(id, nickname, userId, email, address1);
  try {
    await User.update(
      {
        nickname,
        userId,
        email,
        address1,
        address2,
        address3,
        pet,
      },
      {
        where: { id: id },
      }
    );
    await Pet.update(
      {
        name: petName,
        type: petType,
        kind: petKind,
        age: Number(petAge),
        etc: petEtc,
      },
      {
        where: { id: id },
      }

    );

    return res.redirect("/page/mypage");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러 발생" });
  }
};
