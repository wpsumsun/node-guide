const express = require("express");
const router = express.Router();
const { getList, getBlog, createBlog, updateBlog, removeBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/responseModel");
const loginCheck = require("../middleward/loginCheck");

router.get("/list", (req, res, next) => {
  let { author = "", keyword = "" } = req.query || {};
  if(req.query.isAdmin) {
    author = req.session.username
  }
  return getList(author, keyword).then(listData => {
    res.json(new SuccessModel(listData));
  });
});

router.get("/detail", (req, res, next) => {
  const { id } = req.query;
  return getBlog(id).then(blog => {
    res.json(new SuccessModel(blog))
  });
});

router.post("/create", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  return createBlog(req.body).then(result => {
    res.json(new SuccessModel(result))
  });
});

router.post("/update", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  req.body.id = req.query.id;
  return updateBlog(req.body).then(result => {
    if (result) res.json(new SuccessModel(result));
    res.json(new ErrorModel(result));
  });
});

router.delete("/delete", loginCheck, (req, res, next) => {
  const author = req.session.username;
  const { id } = req.query;
  return removeBlog({id, author}).then(result => {
    if (result) res.json(new SuccessModel(result));
    res.json(new ErrorModel("删除失败"));
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