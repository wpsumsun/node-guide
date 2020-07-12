const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/responseModel");
const { set, get } = require("../db/redis");

const handleUserRouter = (req, res) => {
  const method = req.method;
  
  //用户登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    return login(username, password).then(({ username, realname }) => {
      if (username) {
        req.session.username = username;
        req.session.realname = realname;
        set(req.sessionId, req.session);
        return new SuccessModel();
      }
      return new ErrorModel();
    });
  }
  
  if (method === "GET" && req.path === "/api/user/login-check") {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({session: req.session}));
    }
    return Promise.resolve(new ErrorModel());
  }
};

module.exports = handleUserRouter;