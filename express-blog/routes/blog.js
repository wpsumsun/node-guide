const express = require("express");
const router = express.Router();
const { getList, getBlog, createBlog, updateBlog, removeBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

router.get("/list", (req, res, next) => {
  let { author = "", keyword = "" } = req.query || {};
  if(req.query.isAdmin) {
    author = req.session.username
  }
  return getList(author, keyword).then(listData => {
    res.json(new SuccessModel(listData));
  });
});

router.get("/session-test", (req, res, next) => {
  const session = req.session;
  if (!session.viewCount) {
    session.viewCount = 0;
  }
  session.viewCount++;
  res.json({
    viewCount: session.viewCount
  })
});



module.exports = router;