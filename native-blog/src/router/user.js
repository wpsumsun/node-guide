const handleUserRouter = (req, res) => {
  const method = req.method;
  
  //用户登录
  if (method === "POST" && req.path === "/api/user/login") {
    return {
      msg: "用户登录"
    }
  }
};

module.exports = handleUserRouter;