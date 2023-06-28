const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const {
  afterUploadImage,
  uploadComment,
  deleteComment,
  likePost,
  deletePost,
} = require("../controllers/post");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/img", upload.any(), afterUploadImage);

router.post("/:postId/comments", uploadComment);
router.delete("/:postId/comments/:commentId", deleteComment);

router.post("/:postId/likes", isLoggedIn, likePost);
router.delete("/:postId/likes", isLoggedIn, deletePost);

module.exports = router;
