const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const handleUserRouter = (req, res) => {
  const method = req.method;
  
  //用户登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    return result ? new SuccessModel(result) : new ErrorModel(result);
  }
};

module.exports = handleUserRouter;