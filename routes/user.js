const express = require("express");
const router = express.Router();

// const { checkUserId, checkUserNick } = require("../controllers/user");
const { checkUser, getPost, editUser } = require("../controllers/user");

router.get("/check", checkUser);

// router.get("/check", checkUserNick);

router.post("/:id", editUser);

router.get("/:id/posts", getPost);

// router.patch('/:id', updateUser);



module.exports = router;
