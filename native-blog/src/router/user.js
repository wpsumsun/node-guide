const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const getExpires = () => {
  const date = new Date();
  date.setTime(Date.now() + 24 * 60 *60 * 1000);
  return date.toGMTString();
};

const handleUserRouter = (req, res) => {
  const method = req.method;
  
  //用户登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    return login(username, password).then(result => {
      if (result.username) {
        res.setHeader("Set-Cookie", `username=${result.username};path=/;httpOnly;Expires=${getExpires()}`);
        return new SuccessModel();
      }
      return new ErrorModel();
    });
  }
  
  if (method === "GET" && req.path === "/api/user/login-check") {
    if (req.cookie.username) {
      return Promise.resolve(new SuccessModel({username: req.cookie.username}));
    }
    return Promise.resolve(new ErrorModel());
  }
};

module.exports = handleUserRouter;