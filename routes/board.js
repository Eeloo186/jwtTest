const express = require("express");
const router = express.Router();

const {
  uploadPost,
  editPost,
  deletePost,
  sortPost,
  searchPost,
  totalPage,
} = require("../controllers/board");
router.get("/:boardName/totalPages", totalPage);
router.get(`/:boardName/posts`, sortPost);
router.post(`/:boardName/posts`, uploadPost);
router.put(`/:boardName/posts`, editPost);
router.delete(`/:boardName/posts/:postId`, deletePost);

router.get(`/:boardName/post`, searchPost);

module.exports = router;
