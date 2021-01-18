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

module.exports = router;