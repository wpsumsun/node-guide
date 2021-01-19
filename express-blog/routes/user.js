const express = require("express");
const router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  return login(username, password).then(({ username, realname }) => {
    if (username) {
      req.session.username = username;
      req.session.realname = realname;
      res.json(new SuccessModel({}));
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
});

router.get("/login-test", (req, res, next) => {
  const session = req.session;
  if (session.username) {
    res.json({
      code: 0,
      msg: "登录成功"
    })
    return;
  }
  res.json({
    error: -1,
    msg: "登录失败"
  })
});



module.exports = router;