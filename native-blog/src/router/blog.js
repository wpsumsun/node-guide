const { getList, getBlog, createBlog, updateBlog, removeBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  
  //获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query || {};
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData);
    });
  }
  
  //获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const { id } = req.query;
    return getBlog(id).then(blog => {
      return new SuccessModel(blog);
    });
  }
  
  //新建博客
  if (method === "POST" && req.path === "/api/blog/create") {
    return createBlog(req.body).then(res => {
      return new SuccessModel(res);
    });
  }
  
  //更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    return updateBlog(req.body).then(result => {
      if (result) return new SuccessModel(result);
      return new ErrorModel(result)
    });
  }
  
  //删除博客
  if (method === "DELETE" && req.path === "/api/blog/delete") {
    const { id, author } = req.query;
    return removeBlog({id, author}).then(result => {
      if (result) return new SuccessModel(result);
      return new ErrorModel(result)
    });
    return new SuccessModel(result);
  }
};

module.exports = handleBlogRouter;