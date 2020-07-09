const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const handleUserRouter = (req, res) => {
  const method = req.method;
  
  //用户登录
  if (method === "GET" && req.path === "/api/user/login") {
    const { username, password } = req.query;
    return login(username, password).then(({ username, realname }) => {
      if (username) {
        req.session.username = username;
        req.session.realname = realname;
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