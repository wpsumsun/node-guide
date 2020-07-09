const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const handleUserRouter = (req, res) => {
  const method = req.method;
  
  //用户登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    return login(username, password).then(result => {
      if (result.username) {
        return new SuccessModel();
      }
      return new ErrorModel();
    });
  }
};

module.exports = handleUserRouter;