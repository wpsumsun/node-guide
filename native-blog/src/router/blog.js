const { getList, getBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  
  //获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query || {};
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  
  //获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const { id } = req.query;
    const blog = getBlog(id);
    return new SuccessModel(blog);
  }
  
  //新建博客
  if (method === "POST" && req.path === "/api/blog/add") {
    return {
      msg: "新建博客"
    }
  }
  
  //更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "更新博客"
    }
  }
  
  //删除博客
  if (method === "DELETE" && req.path === "/api/blog/delete") {
    return {
      msg: "删除博客"
    }
  }
};

module.exports = handleBlogRouter;